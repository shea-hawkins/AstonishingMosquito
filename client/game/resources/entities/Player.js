import Entity from './Entity';

export default class Player extends Entity {
    constructor(store) {
      super(store);
      this.sprite = new PIXI.Sprite.fromImage('assets/img/player.png');

      this.sprite.width = 80;
      this.sprite.height = 80;
      this.sprite.position.x = 350;
      this.sprite.position.y = 400;
      this.container.addChild(this.sprite);
    }

    render() {

    }
}