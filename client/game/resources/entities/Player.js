import Entity from './Entity';

export default class Player extends Entity {
    constructor(store) {
      super(store);

      this.lives = 4;

      this.state = {
        'stateName': 'STANDING',
        'possibleStates': ['JUMPING', 'STANDING'],
        'baseImg': 'assets/img/player-'
      }

      this.sprite = new PIXI.Sprite.fromImage(this.state.baseImg + this.state.stateName + '.png');

      this.sprite.width = 75;
      this.sprite.height = 75;
      // makes the collidable area of the sprite a bit towards the center
      this.collisionWidth = this.sprite.width / 4;
      this.collisionHeight = this.sprite.height / 4;
      this.sprite.position.x = 350;
      this.sprite.position.y = 400;

      this.container.addChild(this.sprite);

      window.addEventListener("keydown", function(event) {
        if (this.state.stateName === 'STANDING') {
          this.changeState('JUMPING');
          var stage = this.store.getState().stage;
          stage.removeChild(this.container);
          stage.addChild(this.container);
          // this.container.removeChild(this.sprite);
          // this.container.addChild(this.sprite);
          // remove jumping sprite from stage
          // add it back to stage
          setTimeout(this.changeState.bind(this, 'STANDING'), 350);
        }
      }.bind(this));

      // Any throttling/input manipulation can be done to the collision events.
      this.store.getState().collisionDetector.registerEntitySubject(this)
        .distinctUntilChanged()
        .subscribe(
          entity => {
            this.collide(entity);
          }
        );
    }

    collide(otherEntity) {
      var gameState = this.store.getState();
      if (this.state.stateName === 'JUMPING') {
        return;
      } else if (gameState.lives <= 0) {
        this.store.dispatch({type: 'gameOver', data: null});
      } else {
        this.store.dispatch({type: 'decrementLife', data: null});
      }
    }

    changeState(stateName) {
      this.state.stateName = stateName;

      var oldSprite = this.sprite;

      this.sprite = new PIXI.Sprite.fromImage(this.state.baseImg + this.state.stateName + '.png');
      this.sprite.width = oldSprite.width;
      this.sprite.height = oldSprite.height;
      this.sprite.position.x = oldSprite.position.x;
      this.sprite.position.y = oldSprite.position.y;

      this.container.removeChild(oldSprite);

      oldSprite.renderable = false;
      oldSprite.destroy();

      this.container.addChild(this.sprite);
    }

    // jump(event) {
    //   console.log(event.keycode);
    //   if (this.state.stateName === 'STANDING') {
    //     this.changeState.bind(this, 'JUMPING')
    //   } else {
    //     this.changeState.bind(this, 'STANDING')
    //   }

    // }

    render() {

    }
}
