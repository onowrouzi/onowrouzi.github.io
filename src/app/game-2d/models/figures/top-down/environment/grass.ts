import { GameWindow } from 'app/game-2d/models/window/game-window';
import { GridTile } from 'app/game-2d/models/figures/top-down/environment/grid-tile';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';

export class GrassTile extends GridTile {

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  async load() {
      this.sprites = await this.loader.load(['assets/sprites/environment/grass-tile.png'], this.getWidth(), this.getHeight());
  }

  render() {
    for (let x = 0; x < this.stopX; x += this.getWidth()) {
      for (let y = 0; y < this.stopY; y += this.getHeight()) {
        this.ctx.drawImage(this.sprites[0].img, x, y, this.getWidth(), this.getHeight());
      }
    }
  }
}
