import { OnCollision } from 'app/game-2d/utilities/collision/on-collision';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { Potion } from 'app/game-2d/models/figures/top-down/environment/potion';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';

export class PlayerPotionCollisionManager implements OnCollision<PlayerTopDownFigure, Potion> {
  onCollision(p1: PlayerTopDownFigure, p2: Potion) {
    if (CollisionDetector.intersects(p1.getCollisionBox(), p2.getCollisionBox())) {
      p1.health++;
      p2.deleted = true;
    }
  }
}
