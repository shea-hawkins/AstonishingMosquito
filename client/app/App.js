import React from 'react';
import ReactDOM from 'react-dom';
// import { spring } from 'react-motion';
import { RouteTransition } from 'react-router-transition';
import HeaderView from './resources/stateless/HeaderView';
import LibraryView from './resources/libraryView/LibraryView';
import GameView from './resources/gameView/GameView';

// const pop = {
//   atEnter: {
//     scale: 0.8,
//     opacity: 0
//   },
//   atLeave: {
//     scale: spring(0.8, popConfig),
//     opacity: spring(0, popConfig)
//   },
//   atActive: {
//     scale: spring(1, popConfig),
//     opacity: 1
//   },
//   mapStyles(styles) {
//     return {
//       opacity: styles.opacity,
//       transform: `scale(${styles.scale})`
//     };
//   }
// };

class App extends React.Component {
  render() {
    return (
      <div className='container'>
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
