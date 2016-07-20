import Entity from './Entity';

export default class Wave extends Entity {
    constructor(store, opts) {
      super(store);

      opts = opts || {};
      // Takes the input value or sets a default/random value
    
      this.color = opts.color || Math.floor(0x1000000 * Math.random());
      // this.color = opts.color || this.rainbow(Math.floor(Math.random() * (255 - 0 + 1)) + 0);
      console.log(this.color);
      this.thickness = opts.thickness || Math.random() * 10 + 3;
      this.radius = opts.radius || 10;
      this.speed = opts.speed || .025;
      this.graphics = new PIXI.Graphics();
      this.graphics.position.x = opts.x || 200;
      this.graphics.position.y = opts.y || 200;

      this.graphics.blendMode = PIXI.BLEND_MODES.ADD;
      this.graphics.blur = new PIXI.filters.BlurFilter();

      // Each entity has a container that is rendered. This is so that you can
      // have multiple graphics objects within the same entity. For instance,
      // let's say that we wanted to have the beatbox also contain a 'sound'
      // graphic (little music notes whenever it plays a wabe).
      // We would simply add the speaker graphic to the container.
      this.container.addChild(this.graphics);
    }

    inBounds() {
      var renderer = this.store.getState().renderer;
      var gameWidth = Math.pow((Math.pow(renderer.height, 2) + Math.pow(renderer.width, 2)), .5);
      return gameWidth > this.radius;
    }

    rainbow(length) {
        var i = (length * 255 / 255);
        var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
        var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
        var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }


    render() {
      if (!this.inBounds()) {
        // Calls the Entity destruction method, which handles all cleanup
        this.destroy();
        return;
      }
      this.graphics.clear();
      this.graphics.lineStyle(this.thickness, this.color);
      this.graphics.drawCircle(0, 0, this.radius);
      this.radius += this.radius*this.speed;
    }
}
