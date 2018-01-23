import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { GrassTile } from 'app/game-2d/models/figures/top-down/environment/grass';
import { OnCollision } from 'app/game-2d/utilities/collision/on-collision';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';

export class PlayerGrassCollisionManager implements OnCollision<PlayerTopDownFigure, GrassTile> {
  onCollision(player: PlayerTopDownFigure, grass: GrassTile) {
    if (CollisionDetector.intersects(player.getCollisionBox(), grass.getCollisionBox())) {
      console.log('collision detected');
    }
  }
}
