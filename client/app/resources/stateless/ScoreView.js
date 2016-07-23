import React from 'react';

export default (props) => {
  return (
    <header>
      <div id='score-box'>
        <span>current lives:</span>
        <div id='current-score'>{props.lives}</div>
      </div>
      <div id='time-box'>
        <span>remaining seconds:</span>
        <div id='remaining-time'>{Math.floor(props.duration - props.time)}</div>
      </div>
    </header>
  );
};
