import React from 'react';
import ReactDOM from 'react-dom';
import HeaderView from './resources/stateless/HeaderView';
import LibraryView from './resources/libraryView/LibraryView';
import GameView from './resources/gameView/GameView';

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderView />
          {this.props.children}        
      </div>
    )
  }
}

export default App;
