import { StaticSprite } from 'app/game-2d/models/figures/static-sprite';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';

export class WaterCooler extends StaticSprite {

  constructor (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  async load() {
    this.sprites = await this.loader.load(['assets/sprites/environment/Water Cooler.png'], this.getWidth(), this.getHeight());
  }
}
