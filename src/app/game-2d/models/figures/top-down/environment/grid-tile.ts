import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { GameWindow } from 'app/game-2d/models/window/game-window';

export abstract class GridTile extends GameSprite {
  stopX: number;
  stopY: number;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, stopX?: number, stopY?: number) {
    super(x, y, width, height, ctx);

    this.stopX = stopX || this.window.width;
    this.stopY = stopY || this.window.height;
  }
}
