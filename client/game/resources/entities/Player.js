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

/*
var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var bol = false;

// create a texture from an image path
var texture = PIXI.Texture.fromImage('_assets/flowerTop.png');

// create a second texture
var secondTexture = PIXI.Texture.fromImage('_assets/eggHead.png');

// create a new Sprite using the texture
var dude = new PIXI.Sprite(texture);

// center the sprites anchor point
dude.anchor.set(0.5);

// move the sprite to the center of the screen
dude.position.x = renderer.width / 2;
dude.position.y = renderer.height / 2;

stage.addChild(dude);

// make the sprite interactive
dude.interactive = true;

dude.on('click', function ()
{
    bol = !bol;

    if(bol)
    {
        dude.texture = secondTexture;
    }
    else
    {
        dude.texture = texture;
    }
});

animate();

function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    dude.rotation += 0.1;

    // render the stage
    renderer.render(stage);
}

*/