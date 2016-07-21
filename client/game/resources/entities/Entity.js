// Each entity must have a container property so that it may be
// added to the stage.
export default class Entity {
    // clarify the difference between the container
    // and the things added to the container
    constructor(store) {
      this.store = store;
      // Can be changed to a more reliable unique ID, but we never expect more than ~15
      // objects on the screen at a time right now.
      this.id = Math.floor(Math.random() * 10000);
      this.container = new PIXI.Container();
      this.renderable = true;
      store.dispatch({type: 'addEntity', data: this});
    }
    destroy() {
      this.renderable = false;
      this.store.dispatch({type: 'removeEntity', data: this});
      this.container.destroy(true);
    }
    // can be overridden
    collide(otherEntity) {}
    render() {
      console.error('The render method of each entity must be overridden.');
    }
}
