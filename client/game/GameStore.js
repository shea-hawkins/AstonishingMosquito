import { createStore } from 'redux';

// Set initial state
var state = {
  entities: [],
  stage: {},
  lives: 5,
  time: {elapsed: 0, duration: 0},
  stateName: 'PLAYING'
};

// Object that keeps track of listeners to actions on the store 
var storeListeners = {
  'eventName': [(newState, action) => {
    // Callback is called with the newState and the action
  }]
};

/** List of all the actions used in the Game
  */
var actions = {
  addEntity: function(prevState, entity) {
    var entities = prevState.entities.slice();
    entities.push(entity);
    prevState.stage.addChild(entity.container);
    return Object.assign({}, prevState, {
      entities: entities
    });
  },
  updateTime: function(prevState, time) {
    return Object.assign({}, prevState, {
      time: time
    });
  },
  decrementLife: function(prevState) {
    var lives = prevState.lives - 1;
    return Object.assign({}, prevState, {
      lives: lives
    });
  },
  updateGameState: function(prevState, stateName) {
    return Object.assign({}, prevState, {
      stateName: stateName
    });
  },
  gameOver: function(prevState) {
    return Object.assign({}, prevState, {
      stateName: 'GAMEOVER'
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

/** Takes in a redux action and modifies the state based upon action
  * Actions are defined previously from stateful component models
  * Will also call any of the listeners for the action 
  */
var reducer = function(prevState = state, action) {
  if (actions[action.type]) {
    var newState = actions[action.type](prevState, action.data);
    // Calls the listeners if they exist
    if (storeListeners[action.type]) {
      storeListeners[action.type].forEach(listener => listener(newState, action.data));
    }
    return newState;
  } else {
    console.warn('Game action ' + action.type + ' doesn\'t exist');
    return prevState;
  }
};

/** Creates the store using the reducer 
  */ 
var getStore = function() {
  return createStore(reducer);
};

/** Pushes the callback function onto the storeListener object 
  * where the key is equal to the action type 
  */ 
var addStoreListener = function(event, func) {
  if (storeListeners[event]) {
    storeListeners[event].push(func);
  } else {
    storeListeners[event] = [func];
  }
}

var destroyListeners = function() {
  storeListeners = [];
}

export { getStore, addStoreListener, destroyListeners };
