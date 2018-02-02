import { GameWindow } from 'app/game-2d/models/window/game-window';
import { GridTile } from 'app/game-2d/models/figures/top-down/environment/grid-tile';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';

export class OfficeTile extends GridTile {

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  async load() {
      this.sprites = await this.loader.load(['assets/sprites/environment/Main Floor.png'], this.getWidth(), this.getHeight());
  }

  render() {
    if (this.sprites) {
      for (let x = 0; x < this.window.width; x += this.getWidth()) {
        for (let y = 0; y < this.window.height; y += this.getHeight()) {
          this.ctx.drawImage(this.sprites[0].img, x, y, this.getWidth(), this.getHeight());
        }
      }
    }
  }
}
