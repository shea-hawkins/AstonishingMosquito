import Entity from './Entity';
import Wave from './Wave';

// Same instantiation pattern as Player. See detailed comments there.
export default class Beatbox extends Entity {
  constructor(store) {
    super(store);

    this.sprite = new PIXI.Sprite.fromImage('assets/img/beatbox.png');
    this.sprite.width = 65;
    this.sprite.height = 65;
    this.sprite.anchor.set(0.5);
    this.sprite.position.x = 300;
    this.sprite.position.y = 300;
    this.container.addChild(this.sprite);

    // Pairs this sprite with 'lowpass' filtered song -- see AudioController
    this.subject = this.store.getState().audioController.observables['lowpass'];
    // Generates a wave each time the audio threshold is reached
    this.subject.throttleTime(350) // but no more frequently than 350ms
      .subscribe(val => {
        this.emitWave();
      })
  }

  emitWave() {
    var wave = new Wave(this.store, {
      x: this.sprite.position.x,
      y: this.sprite.position.y
    });
  }

  render() {}
}
