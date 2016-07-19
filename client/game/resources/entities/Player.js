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
      setTimeout(this.changeState.bind(this, 'JUMPING'), 1000);
    }

    changeState(stateName) {
      this.state.stateName = stateName; 

      var oldSprite = this.sprite; 

      this.sprite = new PIXI.Sprite.fromImage(this.state.baseImg + stateName + '.png');

      this.sprite.position.x = oldSprite.position.x;
      this.sprite.position.y = oldSprite.position.y; 

      this.container.removeChild(oldSprite);

      oldSprite.renderable = false; 
      oldSprite.destroy();

      this.container.addChild(this.sprite);
    }

    render() {

    }
}