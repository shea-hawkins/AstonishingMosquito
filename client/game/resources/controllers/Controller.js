// Superclass for AudioController and CollisionDetector
export default class Controller {
  constructor(store) {
    this.observables = {};
    this.store = store;
  }
}
