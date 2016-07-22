import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return (
    <li>
      <Link to={`/game/${props.song.fileName}?${props.song.title}`}>
        <span>"{props.song.title}" - {props.song.artist}</span>
      </Link>
    </li>
  );
};
