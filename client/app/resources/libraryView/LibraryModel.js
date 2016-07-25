import { connect } from 'react-redux';
import 'whatwg-fetch';

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
  },
  uploadingSong: function(prevState) {
    var library = prevState.library;
    library.uploading = true;
    return Object.assign({}, prevState, {
      library: library
    });
  },
  uploadedSong: function(prevState) {
    var library = prevState.library;
    library.uploading = false;
    return Object.assign({}, prevState, {
      library: library
    });
  }
};

var mapStateToProps = function(state) {
  return {
    fetching: state.library.fetching,
    songs: state.library.songs,
    uploading: state.library.uploading
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    onSubmit: function(e) {
      var form = new FormData(e.currentTarget);
      e.preventDefault();
      dispatch({type: 'uploadingSong', data: null});
      fetch(
        '/library',
      {
        method: 'POST',
        body: form
      })
      .then((data) => {
        // Should parse the song and send song data to be smartly added to state
        dispatch({type: 'uploadedSong', data: null});
        document.location.reload();
      });
    },
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
          dispatch({type: 'receiveSongList', data: songs});
          dispatch({type: 'fetchedSongList', data: null});
        });
    }
  };
};

var connection = connect(mapStateToProps, mapDispatchToProps);
export { connection, actions };
