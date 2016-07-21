import React from 'react';
import { connection } from './LibraryModel';
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
      <div className="library-view">
        <div id="upload">
          <h2>Upload a Song</h2>
          <SongUploadView onSubmit={this.props.onSubmit} />
        </div>
        <div id="library-list">
          <h2>Or Select a Favorite</h2>
          <ul>
            {this.props.songs.map((song) => {
              return <LibraryItemView song={song} key={song.id} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
};

export default connection(LibraryView);
