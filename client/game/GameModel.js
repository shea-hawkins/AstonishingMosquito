import { createStore } from 'redux';

var state = {
  entities: [],
  stage: {}
};


// All stage additions and removals must appear here.
// this is so that the entity can be cleaned from every related game object
var actions = {
  addEntity: function(prevState, entity) {
    console.log(prevState);
    var entities = prevState.entities.slice();
    entities.push(entity);
    prevState.stage.addChild(entity.container);
    return Object.assign({}, prevState, {
      entities: entities
    });
  },
  addStage: function(prevState, stage) {
    return Object.assign({}, prevState, {
      stage: stage
    });
  }
};

var reducer = function(prevState = state, action) {
  console.log(prevState, action.type);
  if (actions[action.type]) {
    return actions[action.type](prevState, action.data);
  } else {
    console.warn('Game action ' + action.type + ' doesn\'t exist');
    return prevState;
  }
};

var getStore = function() {
  return createStore(reducer);
};

export { getStore };
