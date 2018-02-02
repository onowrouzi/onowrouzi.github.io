import { GameSprite } from 'app/game-2d/models/figures/game-sprite';

export class Monitor extends GameSprite {

  constructor (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, z?: number) {
    super(x, y, width, height, ctx, null, z);
  }

  async load() {
    this.sprites = await this.loader.load(['assets/sprites/environment/PC Screen.png'], this.getWidth(), this.getHeight());
  }
}
