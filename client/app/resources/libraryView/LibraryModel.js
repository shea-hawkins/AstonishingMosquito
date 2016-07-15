import { connect } from 'react-redux';

var actions = {
  fetchingSongList: function(prevState, data) {
    var library = prevState.library;
    library.fetching = true;
    return Object.assign({}, prevState, {
      library: library
    });
  },
  receiveSongList: function(prevState, data) {
    var library = prevState.library;
    library.songs = data;
    return Object.assign({}, prevState, {
      library: library
    });
  },
  fetchedSongList: function(prevState, data) {
    var library = prevState.library;
    library.fetching = false;
    return Object.assign({}, prevState, {
      library: library
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
          songs = songs.map((song, i) => {
            song.id = i;
            return song;
          });
          console.log(songs);
          dispatch({type: 'receiveSongList', data: songs});
          dispatch({type: 'fetchedSongList', data: null});
        });
    }
  };
};

var connection = connect(mapStateToProps, mapDispatchToProps);
export { connection, actions };
