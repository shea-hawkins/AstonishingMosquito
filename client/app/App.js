import React from 'react';
import ReactDOM from 'react-dom';
import { RouteTransition } from 'react-router-transition'; // Adds small fade effect to page load
import HeaderView from './resources/stateless/HeaderView';
import LibraryView from './resources/libraryView/LibraryView';
import GameView from './resources/gameView/GameView';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
       <!-- Adds small fade effect to page load --> 
        <RouteTransition 
            pathname={this.props.location.pathname}
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
          >
          {this.props.children}
        </RouteTransition>
      </div>
    )
  }
}

export default App;
