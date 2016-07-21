import React from 'react';
import Game from '../../../game/Game.js';
import GameRendererView from './GameRendererView.js';
import ScoreView from '../stateless/ScoreView.js';
import SongQueueView from '../stateless/SongQueueView.js';
import { connection } from './GameModel';

class GameView extends React.Component {
  componentDidMount() {
    // Here we will create the new game instance
    // and bind that game instance to the dom and pass the
    // current song.
    var game = new Game('game', this.props.params.fileName);
    // var state = game.store.getState(); // expect this to be the state object
    game.addEventListener('updateTime', function(newState, data) {
      console.log('data', data); // expect this to be a new time object
    });
    // game.addEventListener('decrementLives', function(newState) {
    //   console.log(newState.lives); // expect this to be a number
    // });
    // game.addEventListener('gameOver', function(newState) {
    //   console.log(newState.stateName) // game
    // });
  }
  render() {
    console.log('inside render, here is the stateName', this.props.stateName);
    return (
      <div>
        <ScoreView />
        <GameRendererView />
        <SongQueueView fileName={this.props.params.fileName}/>
      </div>
    );
  }
}

export default connection(GameView);
