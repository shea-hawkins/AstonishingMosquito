import React from 'react';
import { connection } from './LibraryModel';
import { Motion, spring } from 'react-motion';
import LibraryItemView from '../stateless/LibraryItemView';
import SongUploadView from '../stateless/SongUploadView';

class LibraryView extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.props.fetchSongList();
  }
  render() {
    return (
      //<Motion defaultStyle={{right: 1200}} style={{right: spring(0)}}>
      //{interpolatingStyle => 
        //{ console.log('interpolating style', interpolatingStyle);
          //return (
            <div className="library-view">
              <div id="upload">
                <h2>Upload a Song</h2>
                <SongUploadView onSubmit={this.props.onSubmit} />
              </div>
              <div id="library-list">
                <h2>Or Select a Favorite</h2>
                <ul>
                  {this.props.songs.map((song, index) => {
                    return <LibraryItemView song={song} key={song.id} index={index} />;
                  })}
                </ul>
              </div>
            </div>
          //)}
        //}
      //</Motion>
    );
  }
};

export default connection(LibraryView);
