import React from 'react';
import ReactDOM from 'react-dom';
import HeaderView from './resources/stateless/HeaderView';
import LibraryView from './resources/libraryView/LibraryView';
import GameView from './resources/gameView/GameView';


var exampleSongs = [
  {id: 1, title: 'French Letter'},
  {id: 2, title: 'Born Ready'},
  {id: 3, title: 'Indian Summer'}
];

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderView />
        <GameView />
        <LibraryView songs={exampleSongs} />
      </div>
    )
  }
}

export default App;
