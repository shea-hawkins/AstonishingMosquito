import React from 'react';

export default (props) => {
  return (
    <header>
    <div id='score-box'>
      <span>current score:</span>
      <div id='current-score'>394</div>
    </div>
    <div id='time-box'>
      <span>remaining time:</span>
      <div id='remaining-time'>1:42</div>
      <span>min second</span>
    </div>
    </header>
  );
};
