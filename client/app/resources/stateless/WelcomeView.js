import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="welcome-view"> 
      <div id="welcome-content"> 
        <h1> Welcome to Synth </h1> 
        <p> Made By: Shea Hawkins, Jay Arella & Jennifer Ong </p> 
        <div className="start-playing"> 
          <Link to='/library' > Start Playing </Link>
        </div>
      </div>
    </div>
  );
};