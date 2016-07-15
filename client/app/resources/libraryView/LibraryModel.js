import { connect } from 'react-redux';

var actions = {
  fetchingSongList: function(prevState, data) {
    return Object.assign({}, prevState, {
      library: {
        fetching: true,
        songs: prevState.library.nodes
      }
    });
  }
};

var mapStateToProps = function(state) {
  return {
    fetching: state.library.fetching,
    songs: state.library.songs
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    fetchSongList: () => {
      dispatch({type: 'fetchingSongList', data: null});
      fetch('/library')
        .then((response) => {
          return response.json();
        })
        .then((songs) => {
          dispatch({type: 'receiveSongList', data: songs});
          dispatch({type: 'fetchedSongList', data: null});
          console.log(songs);
        });
    }
  };
};

var connection = connect(mapStateToProps, mapDispatchToProps);

export { connection };
