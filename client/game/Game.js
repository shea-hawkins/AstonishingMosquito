import { getStore, addStoreListener, destroyListeners } from './GameStore';
import Beatbox from './resources/entities/Beatbox';
import Player from './resources/entities/Player';
import Wave from './resources/entities/Wave';
import CollisionDetector from './resources/controllers/CollisionDetector';
import AudioController from './resources/controllers/AudioController';

class Game {
  constructor (id, song) {
    // Create and bind PIXI renderer to DOM
    var renderer = new PIXI.autoDetectRenderer(1200, 600, {transparent: true});
    var stage = new PIXI.Container();
    this.node = document.getElementById(id);
    this.node.appendChild(renderer.view);

    // Creates store for Game
    this.store = getStore();

    // Defining and passing store into controllers
    var collisionDetector = new CollisionDetector(this.store);
    var audioController = new AudioController(this.store, {node: this.node, fileName: song});
    
    // Adds game globals to store 
    this.store.dispatch({type: 'addGameItem', data: {key: 'renderer', val: renderer}});
    this.store.dispatch({type: 'addGameItem', data: {key: 'stage', val: stage}});
    this.store.dispatch({type: 'addGameItem', data: {key: 'collisionDetector', val: collisionDetector}});
    this.store.dispatch({type: 'addGameItem', data: {key: 'audioController', val: audioController}});
    
    // Instantiates game enemy and player entities with store
    var beatbox = new Beatbox(this.store);
    var player = new Player(this.store);

    // Render game 
    this.render();
  }

  addEventListener(event, callback) {
    addStoreListener(event, callback);
  }

  destroy() {
    destroyListeners();
    var state = this.store.getState();
    state.audioController.pause();
    state.renderer.destroy();
  }

  render() {
    var state = this.store.getState();
    if (state.stateName === 'GAMEOVER') {
      state.audioController.pause();
    }

    // Calls the render function of all entities that share the Entity superclass (Wave, Beatbox, and Player)
    state.entities.forEach((entity) => {
      if (entity.renderable) {
        state.collisionDetector.detectCollisions(entity);
        entity.render();
      }
    });

    // Uses the PIXI render function to render the web GL window to the DOM 
    state.renderer.render(state.stage);
    // Uses the browser's built-in method to listen for an animation update
    window.requestAnimationFrame(this.render.bind(this));
  }
}

export default Game;
