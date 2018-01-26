import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { OnCollision } from 'app/game-2d/utilities/collision/on-collision';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';
import { GameFigure } from 'app/game-2d/models/figures/game-figure';

export abstract class StaticSprite extends GameSprite implements OnCollision<GameFigure, StaticSprite> {

  constructor (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  detectCollision(gf: GameFigure) {
    this.onCollision(gf, this);
  }

  onCollision(gf: GameFigure, sf: StaticSprite) {
    if (CollisionDetector.intersects(gf.getCollisionBox(), sf.getCollisionBox())) {
      gf.movementHandler.moveBack();
    }
  }
}
