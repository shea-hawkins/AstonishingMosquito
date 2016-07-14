import { createStore } from 'redux';

var actions = Object.assign({});

var state = {

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
