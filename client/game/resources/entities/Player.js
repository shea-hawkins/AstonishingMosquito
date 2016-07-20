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
          setTimeout(this.changeState.bind(this, 'STANDING'), 500);
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
      if (this.lives <= 0) {
        this.store.dispatch({type: 'endGame', data: null});
      } else {
        this.lives--;
      }
    }

    changeState(stateName) {
      this.state.stateName = stateName;

      var oldSprite = this.sprite;

      this.sprite = new PIXI.Sprite.fromImage(this.state.baseImg + this.state.stateName + '.png');

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
