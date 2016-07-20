import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return (
    <li>
      <Link to={`/game/${props.song.fileName}`}>
        <span>{props.song.title}</span>
      </Link>
    </li>
  );
};
