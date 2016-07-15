import React from 'react';
import { connection } from './LibraryModel';
import LibraryItemView from '../stateless/LibraryItemView';

class LibraryView extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.props.fetchSongList();
  }
  render() {
    return (
      <ul className='collection'>
        {this.props.songs.map(function(song) {
          return <LibraryItemView song={song} key={song.id} id={song.id} />;
        })}
      </ul>
    );
  }
};

export default connection(LibraryView);
