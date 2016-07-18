import Entity from './Entity';

export default class Wave extends Entity {
    constructor(store) {
      super(store);
      this.sprite = new PIXI.Sprite.fromImage('assets/img/Player.png');
      this.container.addChild(this.sprite);
    }
}
