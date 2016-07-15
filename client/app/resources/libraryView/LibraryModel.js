import { connect } from 'react-redux';

var mapStateToProps = function(state) {
  return {
    songs: state.library.songs
  };
};

var mapDispatchToProps = function(dispatch) {
  return {
    fetchSongList: () => {
      //
    }
  };
};

var connection = connect(mapStateToProps, mapDispatchToProps);

export { connection };
