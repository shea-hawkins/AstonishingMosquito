import Controller from './Controller.js';
import RX from 'rxjs';

export default class AudioController extends Controller {
  constructor(store, opts) {
    super(store);
    this.node = document.createElement('AUDIO');
    opts.node.appendChild(this.node);
    this.node.src = 'songLibrary/' + opts.fileName;



    var context = new AudioContext();
    var source = context.createMediaElementSource(this.node);

    // Begin GenerateSubject
    var subject = new RX.Subject();
    var filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    var peakFinder = context.createScriptProcessor(16384, 1, 1);
    peakFinder.onaudioprocess = function(chunk) {
      // Only emits one peak per chunk
      var peakEmitted = false;
      for (var channel = 0; channel < chunk.outputBuffer.numberOfChannels; channel++) {
        var inputData = chunk.inputBuffer.getChannelData(channel);
        for (var sample = 0; sample < chunk.inputBuffer.length; sample++) {
          // mutable structure modifies the output buffer as well
          if (inputData[sample] > .4 && !peakEmitted) {
            subject.next(inputData[sample]);
            peakEmitted = true;
          }
        }
      }
      peakEmitted = false;
    };
    this.observables[[.6, 'lowpass']] = subject;
    source.connect(filter);
    filter.connect(peakFinder);
    peakFinder.connect(context.destination);
    // End generateSubject
    source.connect(context.destination);
    this.node.play();
  }
  // Below lies serve side code to process the threshold of the values
  // getPeaksAtThreshold(data, threshold) {
  //   var peaks = [];
  //   for (var i = 0; i < data.length;) {
  //     if (data[i] > threshold) {
  //       peaks.push([data[i], i]);
  //       i += 10000;
  //     }
  //     i++;
  //   }
  //   return peaks;
  // }
  // emitPeak(threshold) {
  //
  // }
  // getPeakMap() {
  //   var offlineContext = new OfflineAudioContext(1, 2, 44100);
  //   return fetch('songLibrary/0b264058603c56dda341f309afac7865')
  //     .then((response) => {
  //       // Retrieves the entire song from the server
  //       return response.arrayBuffer();
  //     })
  //     .then((buffer) => {
  //       console.log(buffer);
  //       // Decodes the entire buffer into audio
  //       return new Promise((resolve, reject) => {
  //         offlineContext.decodeAudioData(buffer, buffer => resolve(buffer));
  //       })
  //     })
  //     .then(audioBuffer => {
  //       // Here we need to get an audioBuffer from the context
  //       // Don't get caught in premature optimizations:
  //       // Iteration 1 will be to simply fetch the same song,
  //       // create a peak map, and event a wave each time a peak in the
  //       // peak map is reached
  //       // Creates a 'source' similar to the source node
  //       var source = offlineContext.createBufferSource();
  //       source.buffer = audioBuffer;
  //
  //       var filter = offlineContext.createBiquadFilter();
  //       filter.type = 'lowpass';
  //
  //       source.connect(filter);
  //       filter.connect(offlineContext.destination);
  //
  //       var peaks,
  //           initialThreshold = .09,
  //           threshold = initialThreshold,
  //           minThreshold = 0.3,
  //           minPeaks = 30; // This minpeaks value determines what the
  //                         // ultimate threshold is chosen to be.
  //                         // the next change can be a 'maxPeaks'
  //
  //       var peaks = this.getPeaksAtThreshold(source.buffer.getChannelData(0), initialThreshold);
  //       return peaks;
  //     });
  // }
}
