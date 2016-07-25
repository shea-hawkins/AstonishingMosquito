import React from 'react';
import { Motion, spring } from 'react-motion';
import { connection } from './LibraryModel';
import { LoadingModal } from '../stateless/Modals';
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
                  {this.props.songs.map((song, index) => {
                    return <LibraryItemView song={song} key={song.id} index={index} />;
                  })}
                </ul>
              </div>
              <LoadingModal show={ this.props.uploading === true } />
            </div>
    );
  }
};

export default connection(LibraryView);
