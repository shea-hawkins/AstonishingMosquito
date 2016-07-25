import { connect } from 'react-redux';

var actions = {
  updatingTime: function(prevState, data) {
    var game = prevState.game;
    game.elapsed = data.elapsed;
    game.duration = data.duration;
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
  updateGameState: function(prevState, data) {
    var game = prevState.game;
    game.stateName = data;
    return Object.assign({}, prevState, {
      game: game
    });
  }
};

var mapStateToProps = function(state) {
  return {
    elapsed: state.game.elapsed,
    duration: state.game.duration,
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
    updateGameState: (stateName) => {
      dispatch({type: 'updateGameState', data: stateName });
    }
  }
};

var connection = connect(mapStateToProps, mapDispatchToProps);
export { connection, actions };
