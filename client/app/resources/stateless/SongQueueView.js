import React from 'react';

export default (props) => {
  // props.title is substringed to remove ? from song title
  return (
    <div id='now-playing'>
      <h2>Now Playing: <span>{props.title.substring(1)}</span></h2>
    </div>
  );
};
