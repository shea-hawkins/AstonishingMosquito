import RX from 'rxjs';
import Controller from './Controller';
import Wave from '../entities/Wave';

export default class CollisionDetector extends Controller {
  constructor(store) {
    super(store);
    this.registeredEntities = [];
  }
  detectCollisions(otherEntity) {
    this.registeredEntities.forEach(entity => {
      if (entity !== otherEntity && this.isColliding(entity, otherEntity)) {
        this.observables[entity.id].next(otherEntity);
      }
    });
  }
  // this function returns an array of [distance between closest points, distance between furthest points]
  calculateDistances(entity, otherEntity) {
    var dist = function(p1, p2) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    // Assumes that the entity is an instanceof player
    if (otherEntity instanceof Wave) {
      var waveGlobals = otherEntity.graphics.toGlobal(new PIXI.Point(0, 0));
      var spriteGlobals = entity.sprite.toGlobal(new PIXI.Point(0, 0));
      var width = entity.sprite.width;
      var height = entity.sprite.height;
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

      // Sprite's closest corner is the one in which the distance calculation is
      // smallest.
      var boundingCorners = corners.reduce((mem, corner) => {
        if (dist(corner, waveGlobals) < mem[0]) {
          mem[0] = dist(corner, waveGlobals);
        }
        if (dist(corner, waveGlobals) > mem[0]) {
          mem[1] = dist(corner, waveGlobals);
        }
        return mem;
      }, [dist(corners[0], waveGlobals), dist(corners[0], waveGlobals)]);
      return boundingCorners;
    }
  }
  isColliding(entity, otherEntity) {
    if (otherEntity instanceof Wave) {
      var radius = otherEntity.radius;
      // to find the radiius at which the wave is colliding withe the unit
      // find the distance of the unit from the wave graphic center
      // in order to keep track of the bounding box, find the distance of the spirite's
      // closes corner from the center and the distance of the sprite's furthest corner.

      // Sprite's closest corner is the one in which the distance calculation is
      // smallest.
      var distances = this.calculateDistances(entity, otherEntity);
      return radius >= distances[0] && radius <= distances[1];
    }
  }
  registerEntitySubject(entity) {
    this.observables[entity.id] = new RX.Subject();
    this.registeredEntities.push(entity);
    return this.observables[entity.id];
  }
  unregisterEntitySubject(entity) {
    this.observables[entity.id].dispose();
    delete this.observables[entity.id];
    this.registeredEntities = this.registeredEntities.filter(regEntity => regEntity !== entity);
  }
}
