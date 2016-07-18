import Entity from './Entity';

export default class Beatbox extends Entity {
    constructor(store) {
      super(store);
      this.sprite = new PIXI.Sprite.fromImage('assets/img/beatbox.png');

      this.sprite.width = 80;
      this.sprite.height = 80;
      this.sprite.position.x = 350;
      this.sprite.position.y = 200;
      this.container.addChild(this.sprite);
    }

    render() {

    }
}