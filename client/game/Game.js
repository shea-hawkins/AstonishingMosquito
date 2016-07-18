import PIXI from './lib/pixi.min.js';
import { getStore } from './GameModel';
import Beatbox from './resources/entities/Beatbox'; 
import Player from './resources/entities/Player';

class Game {
  constructor (id) {
 
    this.stage = new PIXI.Container();

    this.renderer = new PIXI.autoDetectRenderer(this.width, this.height);
    document.getElementById(id).appendChild(this.renderer.view);
    this.store = getStore();

    this.store.dispatch({type: 'addStage', data: this.stage});
    var beatbox = new Beatbox(this.store);
    var player = new Player(this.store);
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
