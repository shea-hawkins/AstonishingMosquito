import React from 'react';

export default (props) => {
  return (
    <div id='now-playing'>
      <h2>Now Playing: <span>{props.title.substring(1)}</span></h2>
    </div>
  );
};
