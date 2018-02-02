import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { SpritesLoader, SpriteObject } from 'app/game-2d/utilities/resource-loaders/sprites-loader';
import { TopDownSpriteState } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-sprite-state';
import { TopDownMovementHandler } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-movement-handler';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';

export abstract class GameSprite extends GameFigure {
  idx: number;
  sprites: SpriteObject[];
  spritesList: {};

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, step?: number, z?: number) {
    super(x, y, width, height, ctx, step, z);

    this.loader = new SpritesLoader();
    this.spritesList = {};
    this.idx = 0;
  }

  setState(state: TopDownSpriteState) {
    this.state = state;
    this.sprites = this.spritesList[state.toString()];
    this.idx = 0;
  }

  render() {
    if (this.sprites && this.sprites.length > 0) {
      this.idx = this.idx < this.sprites.length - 1 ? this.idx + 1 : 0;
      this.ctx.drawImage(this.sprites[this.idx].img, this.getX(), this.getY(), this.getWidth(), this.getHeight());

      // const c = this.getCollisionBox();
      // this.ctx.strokeStyle = 'black';
      // this.ctx.strokeRect(c.left, c.top, c.right - c.left, c.bottom - c.top);
    }
  }

  getCollisionBox() {
    if (this.sprites && this.sprites[this.idx] && this.sprites[this.idx].cBox) {
      const c = this.sprites[this.idx].cBox;
      return new CollisionBox(this.getX() + this.window.width * c.left,
                              this.getX() + this.window.width * c.right,
                              this.getY() + this.window.height * (c.top + c.bottom) / 2,
                              this.getY() + this.window.height * c.bottom);
    }

    return super.getCollisionBox();
  }
}
