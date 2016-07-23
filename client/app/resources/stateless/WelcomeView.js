import React from 'react';
import { Motion, spring } from 'react-motion';
import { Link } from 'react-router';

export default () => {
  return (
    <Motion defaultStyle={{left: 1200}} style={{left: spring(0)}}>
      {interpolatingStyle => 

      { 
      console.log('interpolating style', interpolatingStyle);
      return (
        <div className="welcome-view" style={interpolatingStyle}> 
          <div>
            <a href="http://hackreactor.com">
              <img id="made-at-hr" src="http://i.imgur.com/x86kKmF.png" alt="Built at Hack Reactor"/>
            </a>
          </div>
          <div id="welcome-content"> 
            <h1> Welcome to Synth </h1> 
            <p> Synth is the latest intersection between music and gaming. </p> 
            <p> This addictive web game syncs game difficulty with your preferred playlist, and gives you an unique experience every time you load a new song. Tee up your favorite playlist for hours of addictive play and listening. </p>
            <div className="start-playing"> 
              <Link to='/library' > Start Playing </Link>
            </div>
          </div>
          <div id="credits"> 
            <p id="authors"> Made By: Shea Hawkins, Jay Arella & Jennifer Ong </p> 
            <div id="tech-stack">
              <img src="assets/img/pixi.png" alt="pixijs-logo"/> 
              <img src="assets/img/rxjs.png" alt="rxjs-logo"/> 
              <img src="assets/img/redux.png" alt="redux-logo"/> 
              <img src="assets/img/redis.png" alt="redis-logo"/> 
              <img src="assets/img/node.png" alt="nodejs-logo"/> 
              <img src="assets/img/react.png" alt="react-logo"/> 
              <img src="assets/img/webpack.png" alt="webpack-logo"/> 
            </div>
          </div>
        </div> )
        }
      }
    </Motion>
  );
};