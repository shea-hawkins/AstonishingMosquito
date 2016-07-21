import Controller from './Controller.js';
import RX from 'rxjs';

export default class AudioController extends Controller {
  constructor(store, opts) {
    super(store);
    this.node = document.createElement('AUDIO');
    opts.node.appendChild(this.node);
    this.node.src = 'songLibrary/' + opts.fileName;
    this.context = new AudioContext();
    this.source = this.context.createMediaElementSource(this.node);
    this.generateSubjectAtThreshold(.5);
    this.source.connect(this.context.destination);
    this.node.play();
    this.getIdealThreshold(opts.fileName);
  }
  generateSubjectAtThreshold(threshold) {
    var subject = new RX.Subject();
    var filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    var peakFinder = this.context.createScriptProcessor(16384, 1, 1);
    peakFinder.onaudioprocess = function(chunk) {
      // Only emits one peak per chunk
      var peakEmitted = false;
      for (var channel = 0; channel < chunk.outputBuffer.numberOfChannels; channel++) {
        var inputData = chunk.inputBuffer.getChannelData(channel);
        for (var sample = 0; sample < chunk.inputBuffer.length; sample++) {
          // mutable structure modifies the output buffer as well
          if (inputData[sample] > threshold && !peakEmitted) {
            subject.next(inputData[sample]);
            peakEmitted = true;
          }
        }
      }
      peakEmitted = false;
    };
    this.observables[[.6, 'lowpass']] = subject;
    this.source.connect(filter);
    filter.connect(peakFinder);
    peakFinder.connect(this.context.destination);
  }
  getPeaksAtThreshold(data, threshold) {
    var peaks = [];
    for (var i = 0; i < data.length;) {
      if (data[i] > threshold) {
        peaks.push([data[i], i]);
        i += 16384;
      }
      i++;
    }
    return peaks;
  }
  getIdealThreshold(fileName) {
    var offlineContext = new OfflineAudioContext(1, 2, 44100);
    return fetch('songLibrary/' + fileName)
      .then((response) => {
        // Retrieves the entire song from the server
        return response.arrayBuffer();
      })
      .then((buffer) => {
        // Decodes the entire buffer into audio
        return new Promise((resolve, reject) => {
          offlineContext.decodeAudioData(buffer, buffer => resolve(buffer));
        })
      })
      .then(audioBuffer => {
        // Here we need to get an audioBuffer from the context
        // Creates a 'source' similar to the source node from a media element
        var source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;

        // Filters the music through low pass filter instantly
        var filter = offlineContext.createBiquadFilter();
        filter.type = 'lowpass';
        source.connect(filter);
        filter.connect(offlineContext.destination);
        var peaks,
            initialThreshold = .5,
            threshold = initialThreshold,
            // filteredFreq =
            // minThreshold =
            // maxThreshold =
            maxPeaks = 2 * audioBuffer.duration,
            minPeaks = 1.25 * audioBuffer.duration; // This minpeaks value determines what the
                          // ultimate threshold is chosen to be.
                          // the next change can be a 'maxPeaks'
        console.log(maxPeaks, minPeaks);

        // Next goal: actually hook this up to a filter
        do {
          var peaks = this.getPeaksAtThreshold(source.buffer.getChannelData(0), threshold);
          if (peaks.length > maxPeaks) {
            threshold = threshold + (1 - threshold) / 2;
          } else if (peaks.length < minPeaks) {
            threshold = threshold - threshold / 2;
          }
          console.log(threshold);
        } while (!(peaks.length > minPeaks && peaks.length < maxPeaks));
        console.log(peaks.length);
        return threshold;
      });
  }
}
