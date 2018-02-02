import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';
import { OnCollision } from 'app/game-2d/utilities/collision/on-collision';

export class Potion extends GameSprite implements OnCollision<PlayerTopDownFigure> {

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  async load() {
    this.sprites = await this.loader.load(['assets/sprites/environment/potion.png'], this.getWidth(), this.getHeight());
  }

  onCollision(p: PlayerTopDownFigure) {
    if (CollisionDetector.intersects(p.getCollisionBox(), this.getCollisionBox())) {
      p.heal();
      this.dispose();
    }
  }
}
