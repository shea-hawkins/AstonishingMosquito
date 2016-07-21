import { connect } from 'react-redux';

var actions = {
  updatingTime: function(prevState, data) {
    console.log('updating time!', data);
    var time = prevState.time;
    time.elapsed = data.elapsed;
    time.duration = data.duration;
    return Object.assign({}, prevState, {
      game: time
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
    }
  }
};

var connection = connect(mapStateToProps, mapDispatchToProps);
export { connection, actions };
