import Controller from './Controller.js';

export default class AudioController extends Controller {
  constructor(store, opts) {
    super(store);
    this.node = document.createElement('AUDIO');
    opts.node.appendChild(this.node);
    this.node.src = 'songLibrary/0b264058603c56dda341f309afac7865';
    this.node.play();
  }
}
