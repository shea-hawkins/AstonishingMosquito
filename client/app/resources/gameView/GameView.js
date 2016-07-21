import React from 'react';
import Game from '../../../game/Game.js';
import GameRendererView from './GameRendererView.js';
import ScoreView from '../stateless/ScoreView.js';
import SongQueueView from '../stateless/SongQueueView.js';

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
        <ScoreView score={394} time={"1:24"}/>
        <GameRendererView />
        <SongQueueView fileName={this.props.params.fileName}/>
      </div>
    );
  }
}

export default GameView;
