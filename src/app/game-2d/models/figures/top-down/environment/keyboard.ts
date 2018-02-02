import { GameSprite } from 'app/game-2d/models/figures/game-sprite';

export class Keyboard extends GameSprite {

  constructor (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  async load() {
    this.sprites = await this.loader.load(['assets/sprites/environment/Keyboard.png'], this.getWidth(), this.getHeight());
  }
}
