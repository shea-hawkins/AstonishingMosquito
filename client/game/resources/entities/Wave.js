import Entity from './Entity';
import Player from './Player';

export default class Wave extends Entity {
    constructor(store, opts) {
      super(store);

      opts = opts || {};
      // Takes the input value or sets a default/random value

      this.color = opts.color || Math.floor(0x1000000 * Math.random());
      // this.color = opts.color || this.rainbow(Math.floor(Math.random() * (255 - 0 + 1)) + 0);
      this.radius = 0;
      this.thickness = opts.thickness || Math.random() * 10 + 3;
      this.radius = opts.radius || 10;
      this.speed = opts.speed || .025;
      this.graphics = new PIXI.Graphics();
      this.graphics.position.x = opts.x || 200;
      this.graphics.position.y = opts.y || 200;

      this.graphics.blendMode = PIXI.BLEND_MODES.ADD;
      this.graphics.blur = new PIXI.filters.BlurFilter();

      var timeToImpulse = opts.timeToImpulse || 500;
      this.impulseTime = new Date().getTime() + timeToImpulse;
      this.lastRenderTime = new Date().getTime();
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
      // refactor to an observable pattern placed on the collisionDetector
      // collisionDetector would allow you to register distance updates on
      // pairs of entities
      var state = this.store.getState();
      state.entities.forEach(entity => {
        if (entity.renderable && entity instanceof Player) {
          this.impulseRadius = state.collisionDetector.calculateDistances(entity, this)[0];
        }
      });

      this.currentTime = new Date().getTime();
      // No adjustments are made to the speed of the projectile once it is almost to the
      // impulse time.
      if (this.radius < this.impulseRadius && (this.impulseTime - this.currentTime) > 150) {
        this.velocity = Math.abs((this.impulseRadius - this.radius) / (this.impulseTime - this.currentTime));

      }
      this.radius = this.radius + this.velocity * (this.currentTime - this.lastRenderTime);
      this.lastRenderTime = new Date().getTime();
      this.graphics.clear();
      this.graphics.lineStyle(this.thickness, this.color);
      this.graphics.drawCircle(0, 0, this.radius);
    }
}
