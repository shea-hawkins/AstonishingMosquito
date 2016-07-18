import React from 'react';
import Game from '../../../game/Game.js';

class GameView extends React.Component {
  componentDidMount() {
    // Here we will create the new game instance
    // and bind that game instance to the dom and pass the
    // current song.
    new Game('game');
  }
  render() {
    return (
      <div>
        <span>{this.props.params.fileName}</span>
        <div id="game" />
      </div>
    );
  }
}

export default GameView;
