import React from 'react';
import LibraryItemView from '../stateless/LibraryItemView';

class LibraryView extends React.Component {
  render() {
    return (
      <div>
        {this.props.songs.map(function(song) {
          console.log(song);
          return <LibraryItemView song={song} key={song.id} />;
        })}
      </div>
    );
  }
};

export default LibraryView;
