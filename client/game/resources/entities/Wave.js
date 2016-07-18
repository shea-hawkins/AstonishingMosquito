import Entity from './Entity';

export default class Wave extends Entity {
    constructor(store) {
      super(store);
      this.graphics = new PIXI.Graphics();
      this.graphics.position.x = 200;
      this.graphics.position.y = 240;
      this.container.addChild(this.graphics);
      this.color = 0x7DF9FF;
      this.thickness = Math.random() * 10;
      this.radius = 10;
      this.speed = .05;
    }
    render() {
      this.graphics.clear();
      this.graphics.lineStyle(this.thickness, this.color);
      this.graphics.drawCircle(this.graphics.position.x, this.graphics.position.y, this.radius);
      this.radius += this.radius*this.speed;
    }
}
