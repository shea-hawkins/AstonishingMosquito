import React from 'react';

export default (props) => {
  return (
    <a className='collection-item' id={props.song.id}>
      <span>{props.song.title}</span>
    </a>
  );
};
