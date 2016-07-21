import { createStore } from 'redux';

var state = {
  entities: [],
  stage: {},
  lives: 5
};

var storeListeners = {
  'eventName': [(newState, action) => {
    // Callback is called with the newState and the action
  }]
}


// All stage additions and removals must appear here.
// this is so that the entity can be cleaned from every related game object
var actions = {
  addEntity: function(prevState, entity) {
    var entities = prevState.entities.slice();
    entities.push(entity);
    prevState.stage.addChild(entity.container);
    return Object.assign({}, prevState, {
      entities: entities
    });
  },
  decrementLife: function(prevState) {
    var lives = prevState.lives - 1;
    return Object.assign({}, prevState, {
      lives: lives
    });
  },
  gameOver: function(prevState) {
    return Object.assign({}, prevState, {
      stateName: 'gameOver'
    });
  },
  addGameItem: function(prevState, item) {
    var newItem = {};
    newItem[item.key] = item.val;
    return Object.assign({}, prevState, newItem);
  },
  removeEntity: function(prevState, target) {
    var entities = prevState.entities.filter(entity => entity !== target);
    prevState.stage.removeChild(target.container);
    return Object.assign({}, prevState, {
      entities: entities
    });
  }
};

var reducer = function(prevState = state, action) {
  if (actions[action.type]) {
    var newState = actions[action.type](prevState, action.data);
    if (storeListeners[action.type]) {
      // Allows listeners to be added to the store for any action.
      storeListeners[action.type].forEach(listener => listener(newState, action));
    }
    return newState;
  } else {
    console.warn('Game action ' + action.type + ' doesn\'t exist');
    return prevState;
  }
};

var getStore = function() {
  return createStore(reducer);
};

var addStoreListener = function(event, fun) {
  if (storeListeners[event]) {
    storeListeners[event].push(fun);
  } else {
    storeListeners[event] = [fun];
  }
}

export { getStore, addStoreListener };
