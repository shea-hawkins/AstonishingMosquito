// Each entity must have a container property so that it may be
// added to the stage.
export default class Entity {
    constructor(store) {
      this.store = store;
      this.container = new PIXI.Container();
      store.dispatch({type: 'addEntity', data: this});
    }
    render() {
      console.error('The render method of each entity must be overridden.');
    }
}
