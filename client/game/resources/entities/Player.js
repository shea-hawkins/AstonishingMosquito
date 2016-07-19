import Entity from './Entity';

export default class Player extends Entity {
    constructor(store) {
      super(store);

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
          setTimeout(this.changeState.bind(this, 'STANDING'), 500);
        }
      }.bind(this));
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