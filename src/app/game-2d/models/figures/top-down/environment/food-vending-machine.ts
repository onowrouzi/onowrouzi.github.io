import { StaticSprite } from 'app/game-2d/models/figures/static-sprite';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';
import { OnCollision } from 'app/game-2d/utilities/collision/on-collision';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';

export class SnacksVendingMachine extends StaticSprite implements OnCollision<PlayerTopDownFigure> {

  constructor (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  async load() {
    this.sprites = await this.loader.load(['assets/sprites/environment/Snacks Vending Machine.png'], this.getWidth(), this.getHeight());
  }

  onCollision(p: PlayerTopDownFigure) {
    if (CollisionDetector.intersects(this.getCollisionBox(), p.getCollisionBox())) {
      if (p.flashTimer > 0) {
        super.onCollision(p);
      } else {
        p.hurt();
      }
    }
  }
}
