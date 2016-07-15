import { createStore } from 'redux';

var actions = Object.assign({});

var state = {
  library: {
    songs: [{id: 1, title: 'Song 1'}, {id: 2, title: 'Song 2'}, {id: 3, title: 'Song 3'}]
  }
};

var reducer = function(prevState = state, action) {
  if (actions[action.type]) {
    return actions[action.type](prevState, action.data);
  } else {
    return prevState;
  }
};

var Store = createStore(reducer);

export default Store;
