import { GameWindow } from 'app/game-2d/models/window/game-window';
import { GridTile } from 'app/game-2d/models/figures/top-down/environment/grid-tile';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';

export class GrassTile extends GridTile {

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  async load() {
      this.sprites = await this.loader.load(['assets/sprites/environment/Main Floor.png'],
                            this.window.width * this.width,
                            this.window.height * this.height);
  }

  render() {
    for (let x = 0; x < this.window.width; x += this.window.width * this.width) {
      for (let y = 0; y < this.window.height; y += this.window.height * this.height) {
        this.ctx.drawImage(this.sprites[0], x, y, this.window.width * this.width, this.window.height * this.height);
      }
    }
  }
}
