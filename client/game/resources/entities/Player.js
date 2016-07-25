import Entity from './Entity';

export default class Player extends Entity {
  constructor(store) {
    super(store);

    // Instantiate state and image path 
    this.state = {
      'stateName': 'STANDING',
      'baseImg': 'assets/img/player-'
    };

    // Creates new sprite based upon state
    this.sprite = new PIXI.Sprite.fromImage(this.state.baseImg + this.state.stateName + '.png');
    this.sprite.width = 75;
    this.sprite.height = 75;
    this.sprite.position.x = 900;
    this.sprite.position.y = 300;

    // Places image at center of sprite & makes the collidable area at center of the sprite
    this.sprite.anchor.set(.5);
    this.collisionWidth = this.sprite.width / 4;
    this.collisionHeight = this.sprite.height / 4;

    // Add sprite to Entity's PIXI container 
    this.container.addChild(this.sprite);

    // Listen for user input
    window.addEventListener("keydown", function(event) {
      if (this.state.stateName === 'STANDING') {
        this.changeState('JUMPING');
        var stage = this.store.getState().stage;
        // toggles Player sprite to bring in front of all other entities 
        stage.removeChild(this.container);
        stage.addChild(this.container);
        // Reset Sprite to default state 
        setTimeout(this.changeState.bind(this, 'STANDING'), 300);
      }
    }.bind(this));

    // If Player is at risk to colliding with any other entity, call CollisionDetector 
    this.store.getState().collisionDetector
      .registerEntitySubject(this)
      .distinctUntilChanged()
      .subscribe(
        // if potential collision is detected, then call collide function to perform necessary actions 
        entity => {
          this.collide(entity);
        }
      );
  }

  collide(otherEntity) {
    var gameState = this.store.getState();
    // If the player is jumping, do nothing
    if (this.state.stateName === 'JUMPING') {
      return;
    }
    // If gameState is on last life, set state to GAMEOVER
    if (gameState.lives <= 1) {
      this.store.dispatch({type: 'updateGameState', data: 'GAMEOVER'});
    }
    // Otherwise, decrement life
    this.store.dispatch({type: 'decrementLife', data: null});
  }

  /** Toggles between different potential states and images for Player
    */ 
  changeState(stateName) {
    this.state.stateName = stateName;

    var oldSprite = this.sprite;

    this.sprite = new PIXI.Sprite.fromImage(this.state.baseImg + this.state.stateName + '.png');
    this.sprite.width = oldSprite.width;
    this.sprite.height = oldSprite.height;
    this.sprite.anchor.set(.5);
    this.sprite.position.x = oldSprite.position.x;
    this.sprite.position.y = oldSprite.position.y;

    this.container.removeChild(oldSprite);

    oldSprite.renderable = false;
    oldSprite.destroy();

    this.container.addChild(this.sprite);
  }

  render() {}
}
