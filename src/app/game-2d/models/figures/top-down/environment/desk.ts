import { StaticSprite } from 'app/game-2d/models/figures/static-sprite';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';

export class Desk extends StaticSprite {

  constructor (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  async load() {
    this.sprites = await this.loader.load(['assets/sprites/environment/Brown Desk.png'], this.getWidth(), this.getHeight());
  }

  getCollisionBox() {
    return new CollisionBox(this.getX(), this.getX() + this.getWidth(),
                            this.getY() + this.getHeight() * 0.1, this.getY() + this.getHeight() * 0.7);
  }
}
