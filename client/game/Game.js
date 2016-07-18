import PIXI from './lib/pixi.min.js';
import { getStore } from './GameModel';

class Game {
  constructor (id) {
    this.renderer = new PIXI.autoDetectRenderer(800, 600);
    document.getElementById(id).appendChild(this.renderer.view);
    this.store = getStore();

    var stage = new PIXI.Container();
    this.store.dispatch({type: 'addStage', data: stage});
    this.render();
  }
  render() {
    var state = this.store.getState();
    state.entities.forEach((entity) => {
      entity.render();
    });
    this.renderer.render(state.stage);
    requestAnimationFrame(this.render.bind(this));
  }
}

export default Game;
