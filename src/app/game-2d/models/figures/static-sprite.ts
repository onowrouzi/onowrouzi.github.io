import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { OnCollision } from 'app/game-2d/utilities/collision/on-collision';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';
import { GameFigure } from 'app/game-2d/models/figures/game-figure';

export abstract class StaticSprite extends GameSprite implements OnCollision<GameFigure> {

  constructor (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  onCollision(gf: GameFigure) {
    const gfBox = gf.getCollisionBox();
    const thisBox = this.getCollisionBox();
    if (CollisionDetector.intersects(gfBox, thisBox)) {
      const topDiff = Math.abs(gfBox.top - thisBox.bottom);
      const btmDiff = Math.abs(gfBox.bottom - thisBox.top);
      const leftDiff = Math.abs(gfBox.left - thisBox.right);
      const rightDiff = Math.abs(gfBox.left - thisBox.right);

      switch (Math.min(topDiff, btmDiff, leftDiff, rightDiff)) {
        case topDiff: gf.movementHandler.moveDown(); break;
        case btmDiff: gf.movementHandler.moveUp(); break;
        case leftDiff: gf.movementHandler.moveRight(); break;
        case rightDiff: gf.movementHandler.moveLeft(); break;
      }
    }
  }
}
