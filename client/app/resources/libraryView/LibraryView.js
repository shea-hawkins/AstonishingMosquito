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
      <div className='collection container'>
        <h2>Upload a Song</h2>
        <SongUploadView onSubmit={this.props.onSubmit} />
        <h2>Or Select a Favorite</h2>
        <ul>
          {this.props.songs.map((song) => {
            return <LibraryItemView song={song} key={song.id} />;
          })}
        </ul>
      </div>
    );
  }
};

export default connection(LibraryView);
