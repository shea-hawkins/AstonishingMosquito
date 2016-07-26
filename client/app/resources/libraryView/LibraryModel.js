import { connect } from 'react-redux';
import 'whatwg-fetch'; // fetch polyfill in case browser doesn't have 'fetch' method

var actions = {
  updateLibraryState: function(prevState, data) {
    var library = prevState.library;
    library.stateName = data;
    return Object.assign({}, prevState, {
      library: library
    });
  },
  // Take data received from redis 
  receiveSongList: function(prevState, data) {
    var library = prevState.library;
    library.songs = data;
    return Object.assign({}, prevState, {
      library: library
    });
  }
};

var postSong = function(song) {
  return fetch(
    '/library',
  {
    method: 'POST',
    body: song
  });
};

var fetchSongs = function() {
  return fetch('/library')
    .then((response) => {
      return response.json();
    })
    .then((songs) => {
      return songs.map((song, i) => {
        song.id = i;
        return song;
      });
    });
};

var mapStateToProps = function(state) {
  return {
    fetching: state.library.fetching,
    songs: state.library.songs,
    stateName: state.library.stateName
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    onSubmit: function(e) {
      var song = new FormData(e.currentTarget);
      // Stops browser from refreshing after submit button is clicked 
      e.preventDefault(); 
      // displays the loading modal 
      dispatch({type: 'updateLibraryState', data: 'LOADING'});
      postSong(song)
        .then(() => {
          // hides the loading modal 
          dispatch({type: 'updateLibraryState', data: 'LOADED'});
        });
    },
    fetchSongList: () => {
      dispatch({type: 'updateLibraryState', data: 'LOADING'});
      fetchSongs()
        .then((songs) => {
          dispatch({type: 'receiveSongList', data: songs});
          dispatch({type: 'updateLibraryState', data: 'LOADED'});
        });
    }
  };
};

var connection = connect(mapStateToProps, mapDispatchToProps);
export { connection, actions };
