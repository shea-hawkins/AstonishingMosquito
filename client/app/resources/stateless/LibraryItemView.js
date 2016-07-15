import React from 'react';

export default (props) => {
  return (
    <li className='collection-item'>
      <span>{props.song.title}</span>
    </li>
  );
};
