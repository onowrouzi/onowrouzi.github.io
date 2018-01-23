import { GameWindow } from 'app/game-2d/models/window/game-window';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';
import { Guid } from 'app/game-2d/utilities/guid-generator';
import { ResourceLoaderCallback } from 'app/game-2d/utilities/resource-loaders/resource-loader';

export abstract class GameFigure {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  step: number;
  loaded: boolean;
  deleted: boolean;
  window: GameWindow;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, step?: number) {
    this.ctx = ctx;
    this.window = GameWindow.get();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.step = step || 0.1;
  }

  abstract render();

  load(callback?: ResourceLoaderCallback) {
    this.loaded = true;
  }

  update() {
    this.render();
  }

  getCollisionBox() {
    return new CollisionBox(this.window.width * this.x, this.window.width * this.x + this.width * this.window.width,
                            this.window.height * this.y, this.window.height * this.y + this.height * this.window.height);
  }

  detectCollision(f: GameFigure) {}
}
