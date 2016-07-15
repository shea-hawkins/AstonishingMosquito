import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return (
    <Link to={'/game'} className='collection-item'>
      <span>{props.song.title}</span>
    </Link>
  );
};
