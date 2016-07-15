import PIXI from 'pixi';

class Game {
  constructor (id) {
    var renderer = new PIXI.autoDetectRenderer(800, 600);
    document.getElementById(id).appendChild(renderer.view);
  }
}

export default Game;
