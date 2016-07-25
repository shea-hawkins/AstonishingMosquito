import { createStore } from 'redux';

var state = {
  entities: [],
  stage: {},
  lives: 5,
  time: {elapsed: 0, duration: 0},
  stateName: 'PLAYING'
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

var reducer = function(prevState = state, action) {
  if (actions[action.type]) {
    var newState = actions[action.type](prevState, action.data);
    if (storeListeners[action.type]) {
      // Allows listeners to be added to the store for any action.
      storeListeners[action.type].forEach(listener => listener(newState, action.data));
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

var destroyListeners = function() {
  storeListeners = [];
}

export { getStore, addStoreListener, destroyListeners };
