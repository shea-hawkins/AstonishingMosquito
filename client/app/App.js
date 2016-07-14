import React from 'react';
import ReactDOM from 'react-dom';
import HeaderView from './resources/stateless/HeaderView.js';
import LibraryView from './resources/libraryView/LibraryView';


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
        <LibraryView songs={exampleSongs} />
      </div>
    )
  }
}

export default App;
