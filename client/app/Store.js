import { createStore } from 'redux';
import { actions as libraryActions } from './resources/libraryView/LibraryModel';

var actions = Object.assign({}, libraryActions);

var state = {
  library: {
    fetching: false,
    songs: [{id: 1, title: 'Song 1', filename: '123'}, {id: 2, title: 'Song 2', filename: 'meow'}, {id: 3, title: 'Song 3', filename: 'yo'}]
  }
};

var reducer = function(prevState = state, action) {
  if (actions[action.type]) {
    return actions[action.type](prevState, action.data);
  } else {
    console.warn(`Action ${action.type} doesn't exist.`);
    return prevState;
  }
};

var Store = createStore(reducer);

export default Store;
