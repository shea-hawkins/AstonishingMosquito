import React from 'react';

export default (props) => {
  return (
    <a className='collection-item'>
      <span>{props.song.title}</span>
    </a>
  );
};
