import React from 'react';

export default (props) => {
  return (
    <div id='now-playing'>
      <h1>Now Playing: <span>{props.title.substring(1)}</span></h1>
    </div>
  );
};
