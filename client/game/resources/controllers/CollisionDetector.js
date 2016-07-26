import RX from 'rxjs';
import Controller from './Controller';
import Wave from '../entities/Wave';

export default class CollisionDetector extends Controller {
  constructor(store) {
    super(store);
    // Registered Entity is an entity that is watching for a collision
    this.registeredEntities = [];
  }
  detectCollisions(otherEntity) {
    this.registeredEntities.forEach(entity => {
      // If the current entity is different than the other entity and they are colliding
      if (entity !== otherEntity && this.isColliding(entity, otherEntity)) {
        // send an event to our observers
        this.observables[entity.id].next(otherEntity);
      }
    });
  }
  // this function returns an array of [distance between closest points, distance between furthest points]
  calculateDistances(entity, otherEntity) {
    var dist = function(p1, p2) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    // Assumes that entity is an instanceof player
    if (otherEntity instanceof Wave) {
      // get the coordinates of the sprite and wave
      var waveGlobals = otherEntity.graphics.toGlobal(new PIXI.Point(0, 0));
      var spriteGlobals = entity.sprite.toGlobal(new PIXI.Point(0, 0));
      var width = entity.collisionWidth;
      var height = entity.collisionHeight;
      var corners = [];

      // Establishing bounding box
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

      // Reduce corners to an array of [closest distance, furthest distance]
      var boundingCorners = corners.reduce((mem, corner) => {
      // Calculates distance of all sprite's corners
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
