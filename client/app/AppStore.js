import { createStore } from 'redux';
import { actions as libraryActions } from './resources/libraryView/LibraryModel';
import { actions as gameActions } from './resources/gameView/GameModel';

// Set default state of App
var state = {
  library: {
    fetching: false,
    songs: []
  },
  game: {
    elapsed: 0,
    duration: 0,
    lives: 5,
    stateName: 'LOADING'
  }
};

// Consolidates actions from LibraryModel and GameModel into a new action object
var actions = Object.assign({}, libraryActions, gameActions);

/** Takes in a redux action and modifies the state based upon action
  * Actions are defined previously from stateful component models
  */
var reducer = function(prevState = state, action) {
  if (actions[action.type]) {
    // Creates a new state object from action
    return actions[action.type](prevState, action.data); 
  } else {
    console.warn(`Action ${action.type} doesn't exist.`);
    return prevState;
  }
};

/** Creates Store object using reducer function
  * Refer to redux docs for further information 
  */ 
var Store = createStore(reducer);

export default Store;
