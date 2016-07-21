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
    time: state.game.time,
    lives: state.game.lives,
    stateName: state.game.stateName
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    updateTime: (time) => {
      dispatch({type: 'updatingTime', data: time });
    },
    updateGameState: () => {
      dispatch({type: 'gameOver'});
    }
  }
};

var connection = connect(mapStateToProps, mapDispatchToProps);
export { connection, actions };
