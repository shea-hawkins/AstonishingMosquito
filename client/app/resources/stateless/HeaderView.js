import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <header>
      <div>
        <span>Title</span>
      </div>
      <nav>
        <div><Link to='/library'>Library</Link></div>
        <div><Link to='/game'>Game</Link></div>
      </nav>
    </header>
  );
};
