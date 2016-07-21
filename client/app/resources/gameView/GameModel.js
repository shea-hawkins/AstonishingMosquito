import { connect } from 'react-redux';

var actions = {
  updatingTime: function(prevState, data) {
    var game = prevState.game;
    game.time.elapsed = data.elapsed;
    game.time.duration = data.duration;
    return Object.assign({}, prevState, {
      game: game
    });
  },
  updatingLives: function(prevState, data) {
    var game = prevState.game;
    game.lives = data;
    return Object.assign({}, prevState, {
      game: game
    });
  },
  gameOver: function(prevState, data) {
    var game = prevState.game;
    game.stateName = 'GAMEOVER';
    return Object.assign({}, prevState, {
      game: game
    });
  }
};

var mapStateToProps = function(state) {
  return {
    elapsed: state.game.time.elapsed,
    duration: state.game.time.duration,
    lives: state.game.lives,
    stateName: state.game.stateName
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    updateTime: (time) => {
      dispatch({type: 'updatingTime', data: time });
    },
    updateLives: (lives) => {
      dispatch({type: 'updatingLives', data: lives });
    },
    updateGameState: () => {
      dispatch({type: 'gameOver'});
    }
  }
};

var connection = connect(mapStateToProps, mapDispatchToProps);
export { connection, actions };
