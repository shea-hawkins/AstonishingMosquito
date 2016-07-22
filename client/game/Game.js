import { getStore, addStoreListener } from './GameModel';
import Beatbox from './resources/entities/Beatbox';
import Player from './resources/entities/Player';
import Wave from './resources/entities/Wave';
import CollisionDetector from './resources/controllers/CollisionDetector';
import AudioController from './resources/controllers/AudioController';

class Game {
  constructor (id, song) {
    this.node = document.getElementById(id);
    var renderer = new PIXI.autoDetectRenderer(800, 600);
    this.node.appendChild(renderer.view);

    this.store = getStore();

    var collisionDetector = new CollisionDetector(this.store);
    var audioController = new AudioController(this.store, {node: this.node, fileName: 'd616a066d86c19941cef0d59db569bd8'});
    var stage = new PIXI.Container();

    this.store.dispatch({type: 'addGameItem', data: {key: 'collisionDetector', val: collisionDetector}});
    this.store.dispatch({type: 'addGameItem', data: {key: 'audioController', val: audioController}});
    this.store.dispatch({type: 'addGameItem', data: {key: 'stage', val: stage}});
    this.store.dispatch({type: 'addGameItem', data: {key: 'renderer', val: renderer}});

    var beatbox = new Beatbox(this.store);
    var player = new Player(this.store);
    this.render();
  }
  addEventListener(event, callback) {
    addStoreListener(event, callback);
  }
  render() {
    var state = this.store.getState();
    state.entities.forEach((entity) => {
      // If the entity has left the screen or if it is currently
      // awaiting grabage colleciton, renderable will be set to false.
      if (entity.renderable) {
        // Collisions are detected before the next render, just in case the
        // collision impacts the render or the render results in destruction of the
        // object
        state.collisionDetector.detectCollisions(entity);
        entity.render();
      }
    });
    state.renderer.render(state.stage);
    requestAnimationFrame(this.render.bind(this));
  }
}

export default Game;
