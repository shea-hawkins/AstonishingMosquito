import Controller from './Controller.js';
import RX from 'rxjs';

export default class AudioController extends Controller {
  constructor(store, opts) {
    super(store);
    // Creates an audio element for the game
    this.node = document.createElement('AUDIO');
    opts.node.appendChild(this.node);

    // Update time and duration every 250ms
    setInterval(() => {
        var time = this.node.currentTime;
        var duration = this.node.duration;
        store.dispatch({type: 'updateTime', data: {elapsed: time, duration: duration}});
    }, 250);

    // Define lowpass and visualization observables
    this.observables['lowpass'] = new RX.Subject();
    this.observables['visualizer'] = new RX.Subject();

    this.node.src = 'songLibrary/' + opts.fileName;

    // Create a new web audio API context
    this.context = new AudioContext();
    // Creates a source from the audio DOM element
    this.source = this.context.createMediaElementSource(this.node);
    // Creates a delay with a max of 2 seconds
    var delay = this.context.createDelay(2);
    this.source.connect(delay);
    // Delays the song so that waves reach the player when the audio plays
    delay.delayTime.value = .75;
    // Create a new analyzer that generates the information for the visualizer
    var analyser = this.context.createAnalyser();
    analyser.fftSize = 128;
    delay.connect(analyser);
    // Finally, connect the analyzer to the speakers
    analyser.connect(this.context.destination);

    this.subscribeSubjectToAnalyser(this.observables['visualizer'], analyser);
    this.store.dispatch({type: 'updateGameState', data: 'LOADING'});
    this.getIdealThreshold(opts.fileName).then(threshold => {
      this.store.dispatch({type: 'updateGameState', data: 'PLAYING'});
      // Each time the bass reaches a specific frequency threshold, we send an event to the observable
      this.subscribeSubjectAtThreshold(this.observables['lowpass'], threshold);
      // Play the song after loading screen fades
      setTimeout(() => this.node.play(), 1000);
    });
  }

  // Get frequency information from our analyzer and send frequencies to our observers
  subscribeSubjectToAnalyser(observable, analyser) {
    // Creates an empty float array with a number of elements equal to the analyzer size
    var floatArray = new Float32Array(analyser.frequencyBinCount);
    var getData = function() {
      analyser.getFloatFrequencyData(floatArray);
      // Sends float array with frequency data filled in to the observers
      observable.next(floatArray);
      requestAnimationFrame(getData);
    }
    getData();
  }

  // Sends peaks to observers each time a peak is above the threshold
  subscribeSubjectAtThreshold(subject, threshold) {
    // Create a lowpass filter
    var filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';

    // Create a custom node that watches the song
    var peakFinder = this.context.createScriptProcessor(16384, 1, 1);

    // Each chunk of the song has the following code block run onto it
    peakFinder.onaudioprocess = function(chunk) {
      // Only emits one peak per chunk
      var peakEmitted = false;

      // For each channel
      for (var channel = 0; channel < chunk.outputBuffer.numberOfChannels; channel++) {
        // Gets the signal data
        var inputData = chunk.inputBuffer.getChannelData(channel);
        // For each sample in the signal
        for (var sample = 0; sample < chunk.inputBuffer.length; sample++) {
          // Sees if it's above the threshold
          if (inputData[sample] > threshold && !peakEmitted) {
            // if it is, send the event to our observers
            subject.next(inputData[sample]);
            peakEmitted = true;
          }
        }
      }
      peakEmitted = false;
    };
    // Connects our filter and peakFinder to audio
    this.source.connect(filter);
    filter.connect(peakFinder);
    peakFinder.connect(this.context.destination);
  }

  pause() {
    this.node.pause();
  }

  // Pushes to array if above threshold
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

  // Downloads the song and calculates the threshold
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

        var peaks,
            initialThreshold = .5,
            threshold = initialThreshold,
            // Determines number of peaks based off length of song
            maxPeaks = 2 * audioBuffer.duration,
            minPeaks = 1.25 * audioBuffer.duration;

        // Next goal: actually hook this up to a filter
        do {
          var peaks = this.getPeaksAtThreshold(source.buffer.getChannelData(0), threshold);
          // Binary search for threshold
          if (peaks.length > maxPeaks) {
            threshold = threshold + (1 - threshold) / 2;
          } else if (peaks.length < minPeaks) {
            threshold = threshold - threshold / 2;
          }
        } while (!(peaks.length > minPeaks && peaks.length < maxPeaks));
        return threshold;
      });
  }
}
