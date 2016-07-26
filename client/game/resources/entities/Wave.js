import Entity from './Entity';
import Player from './Player';

export default class Wave extends Entity {
  constructor(store, opts) {
    super(store);

    // Declare options given to the wave
    opts = opts || {};
    
    // Use previously declared values or set new values for Wave render 
    this.color = opts.color || Math.floor(0x1000000 * Math.random());
    this.thickness = opts.thickness || Math.random() * 10 + 3;
    this.radius = opts.radius || 10;
    this.speed = opts.speed || .025;

    // Generates a new PIXI graphics object for Wave
    this.graphics = new PIXI.Graphics();
    this.graphics.position.x = opts.x || 200;
    this.graphics.position.y = opts.y || 200;

    // Adds effect to Wave 
    this.graphics.blendMode = PIXI.BLEND_MODES.ADD;
    this.graphics.blur = new PIXI.filters.BlurFilter();

    // Calculates the time from where Wave is emitted from Beatbox to reach Player sprite
    var timeToImpact = opts.timeToImpact || 550;
    this.impactTime = new Date().getTime() + timeToImpact;
    this.lastRenderTime = new Date().getTime();

    // Add Wave to container 
    this.container.addChild(this.graphics);
  }

  /** Checks if Wave is still within bounds of the PIXI stage
    * If not, it will be destroyed in the render()
    */
  inBounds() {
    var renderer = this.store.getState().renderer;
    var gameWidth = Math.pow((Math.pow(renderer.height, 2) + Math.pow(renderer.width, 2)), .5);
    return gameWidth > this.radius;
  }
  
  /** Dynamically calculate speed of the wave so that if Player moves,
    * it still reaches the Player at impact time
    */
  getNextRadius() {
    var state = this.store.getState();
    // Finds distance from Player to Wave
    state.entities.forEach(entity => {
      if (entity.renderable && entity instanceof Player) {
        this.impactRadius = state.collisionDetector.calculateDistances(entity, this)[0];
      }
    });

    this.currentTime = new Date().getTime();
    // Speed is fixed when the wave is within 150ms of impact time 
    if (this.radius < this.impactRadius && (this.impactTime - this.currentTime) > 150) {
      this.velocity = Math.abs((this.impactRadius - this.radius) / (this.impactTime - this.currentTime));
    }
    this.radius = this.radius + this.velocity * (this.currentTime - this.lastRenderTime);
    this.lastRenderTime = new Date().getTime();
  }

  render() {
    if (!this.inBounds()) {
      // Calls the Entity destruction method, which handles all cleanup
      this.destroy();
      return;
    }
    // Calculate wave speed 
    this.getNextRadius(); 
    // Wipes the screen 
    this.graphics.clear();

    // If Wave passes Player, then change color of Wave 
    if (this.radius < this.impactRadius) {
      this.renderColor = 0x666666;
    } else {
      this.renderColor = this.color;
    }

    // Create new colored Wave 
    this.graphics.lineStyle(this.thickness, this.renderColor);
    this.graphics.drawCircle(0, 0, this.radius);
  }
}
