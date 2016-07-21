import React from 'react';
import Game from '../../../game/Game.js';

class GameView extends React.Component {
  componentDidMount() {
    // Here we will create the new game instance
    // and bind that game instance to the dom and pass the
    // current song.
    new Game('game', this.props.params.fileName);
  }
  render() {
    return (
      <div>
        <header>
          <div id='score-box'>
            <span>current score:</span>
            <div id='current-score'>394</div>
          </div>
          <div id='time-box'>
            <span>remaining time:</span>
            <div id='remaining-time'>1:42</div>
            <span>min second</span>
          </div>
        </header>
        <div id="game" />
        <footer>
          <h1>Now Playing: <span>{this.props.params.fileName}</span></h1>
          <div id='next-up'>
            Next Up:
          </div>
        </footer>
      </div>
    );
  }
}

export default GameView;
