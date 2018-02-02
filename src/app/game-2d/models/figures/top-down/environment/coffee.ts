import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';
import { OnCollision } from 'app/game-2d/utilities/collision/on-collision';

export class Coffee extends GameSprite implements OnCollision<PlayerTopDownFigure> {

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  async load() {
    this.sprites = await this.loader.load(['assets/sprites/environment/Cup with Coffee.png'], this.getWidth(), this.getHeight());
  }

  onCollision(p1: PlayerTopDownFigure) {
    if (CollisionDetector.intersects(p1.getCollisionBox(), this.getCollisionBox())) {
      p1.heal();
      this.dispose();
    }
  }
}
