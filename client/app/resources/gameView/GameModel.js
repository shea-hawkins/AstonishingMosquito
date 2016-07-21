import { connect } from 'react-redux';

var actions = {
  updatingTime: function(prevState, data) {
    console.log('this is the previous state!', prevState);
    var game = prevState.game;
    game.elapsed = data.elapsed;
    game.duration = data.duration;
    return Object.assign({}, prevState, {
      game: game
    });
  },
  gameOver: function(prevState) {
    console.log('this is the previous states stateName value', prevState.game.stateName);
    var game = prevState.game;
    game.stateName = "GAMEOVER";
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
    updateTime: () => {
      console.log('update time!');
      dispatch({type: 'updatingTime', data: {
          elapsed: 25,
          duation: 25
        }
      });
    },
    updateGameState: () => {
      console.log('update game state');
      dispatch({type: 'gameOver'});
    }
  }
};

var connection = connect(mapStateToProps, mapDispatchToProps);
export { connection, actions };
