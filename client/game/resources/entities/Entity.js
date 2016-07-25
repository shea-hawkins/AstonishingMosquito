// Superclass for the Beatbox, Player and Wave entities
export default class Entity {
  constructor(store) {
    this.store = store;
    // Generate unique ID for each entity
    this.id = Math.floor(Math.random() * 10000);
    // Per PIXI standards, each entity must have a container property 
    // so that it may be added to the stage
    this.container = new PIXI.Container();
    this.renderable = true;
    store.dispatch({type: 'addEntity', data: this});
  }

  destroy() {
    this.renderable = false;
    this.store.dispatch({type: 'removeEntity', data: this});
    this.container.destroy(true);
  }

  // Each entity must be collidable and renderable 
  // These functions can be overridden by the extending class 
  collide(otherEntity) {}
  
  render() {
    console.error('The render method of each entity must be overridden.');
  }
}
