import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { ResourceLoaderCallback } from 'app/game-2d/utilities/resource-loaders/resource-loader';

export abstract class GridTile extends GameSprite {
  stopX: number;
  stopY: number;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D,
              stopX?: number, stopY?: number, loadCallback?: ResourceLoaderCallback) {
    super(x, y, width, height, ctx);

    const window = GameWindow.get();
    this.stopX = stopX || window.width;
    this.stopY = stopY || window.height;

    this.load(loadCallback);
  }
}
