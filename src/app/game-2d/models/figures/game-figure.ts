import { GameWindow } from 'app/game-2d/models/window/game-window';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';
import { Guid } from 'app/game-2d/utilities/guid-generator';
import { ResourceLoader } from 'app/game-2d/utilities/resource-loaders/resource-loader';
import { TopDownMovementHandler } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-movement-handler';
import { TopDownSpriteState } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-sprite-state';

export abstract class GameFigure {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  step: number;
  state: TopDownSpriteState;

  loaded: boolean;
  deleted: boolean;
  window: GameWindow;
  loader: ResourceLoader;
  movementHandler: TopDownMovementHandler;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, step?: number, z?: number) {
    this.ctx = ctx;
    this.window = GameWindow.get();
    this.x = x > 1 ? x / this.window.width : x;
    this.y = y > 1 ? y / this.window.height : y;
    this.z = z || 0;
    this.width = width > 1 ? width / this.window.width : width;
    this.height = height > 1 ? height / this.window.height : height;
    this.step = (step > 1 ? step / this.window.width : step) || 0.1;
  }

  abstract render();

  setState(state: TopDownSpriteState) {
    this.state = state;
  }

  load() {}

  update() {
    this.render();
  }

  dispose() {
    this.deleted = true;
  }

  getX() {
    return this.window.width * this.x;
  }

  getY() {
    return this.window.height * this.y;
  }

  getWidth() {
    return this.window.width * this.width;
  }

  getHeight() {
    return this.window.height * this.height;
  }

  getTop() {
    const c = this.getCollisionBox();
    return c.top;
  }

  getCollisionBox() {
    return new CollisionBox(this.getX(), this.getX() + this.getWidth(), this.getY(), this.getY() + this.getWidth());
  }

  onCollision(g: GameFigure) {}
}
