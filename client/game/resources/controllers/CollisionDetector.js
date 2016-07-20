import RX from 'rxjs';
import Controller from './Controller';
import Wave from '../entities/Wave';

export default class CollisionDetector extends Controller {
  constructor(store) {
    super(store);

  }
  detectCollisions() {

  }
  isColliding(entity, otherEntity) {
    var dist = function(p1, p2) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    // Assumes that the entity is an instanceof player
    if (otherEntity instanceof Wave) {
      var waveGlobals = otherEntity.graphics.toGlobal(new PIXI.Point(0, 0));
      var thickness = otherEntity.radius;
      var radius = otherEntity.radius;
      // to find the radiius at which the wave is colliding withe the unit
      // find the distance of the unit from the wave graphic center
      // in order to keep track of the bounding box, find the distance of the spirite's
      // closes corner from the center and the distance of the sprite's furthest corner.

      // Sprite's closes corner is the one in which the absolute distance calculation is
      // smallest.
      var spriteGlobals = entity.sprite.toGlobal(new PIXI.Point(0, 0));
      var width = entity.sprite.width;
      var height = entity.sprite.height;
      // Needs to determine which diag is the colliding diag.
      var corners = [];
      // top left corner:
      corners.push(new PIXI.Point(
        spriteGlobals.x - width / 2,
        spriteGlobals.y - height / 2
      ));
      // bottom right
      corners.push(new PIXI.Point(
        spriteGlobals.x + width / 2,
        spriteGlobals.y + height / 2
      ));
      // top right
      corners.push(new PIXI.Point(
        spriteGlobals.x + width / 2,
        spriteGlobals.y - height / 2
      ));
      // bottom left
      corners.push(new PIXI.Point(
        spriteGlobals.x - width / 2,
        spriteGlobals.y + height / 2
      ));

      var boundingCorners = corners.reduce((mem, corner) => {
        if (dist(corner, waveGlobals) < mem[0]) {
          mem[0] = dist(corner, waveGlobals);
        }
        if (dist(corner, waveGlobals) > mem[0]) {
          mem[1] = dist(corner, waveGlobals);
        }
        return mem;
      }, [dist(corners[0], waveGlobals), dist(corners[0], waveGlobals)]);
      return radius >= boundingCorners[0] && radius <= boundingCorners[1];
    }
  }
  registerEntity(entity, targetClass) {

  }
}
