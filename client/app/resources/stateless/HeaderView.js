import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper'>
            <a href='#!' className='brand-logo'>Title</a>
            <ul className='right hide-on-med-and-down'>
              <li><Link to='/library'>Library</Link></li>
            </ul>
          </div>
      </nav>
    </div>
  );
};
