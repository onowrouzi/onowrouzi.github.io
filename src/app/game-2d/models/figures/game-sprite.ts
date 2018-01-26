import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { SpritesLoader } from 'app/game-2d/utilities/resource-loaders/sprites-loader';
import { ResourceLoaderCallback } from 'app/game-2d/utilities/resource-loaders/resource-loader';
import { TopDownSpriteState } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-sprite-state';
import { TopDownMovementHandler } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-movement-handler';

export abstract class GameSprite extends GameFigure {
  idx: number;
  sprites: HTMLImageElement[];
  spritesList: {};

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, step?: number) {
    super(x, y, width, height, ctx, step);

    this.loader = new SpritesLoader();
    this.spritesList = {};
  }

  setState(state: TopDownSpriteState) {
    this.state = state;
    this.sprites = this.spritesList[state.toString()];
    this.idx = 0;
  }

  render() {
    if (this.loaded) {
      this.idx = this.idx < this.sprites.length - 1 ? this.idx + 1 : 0;
      this.ctx.drawImage(this.sprites[this.idx],
                          this.window.width * this.x,
                          this.window.height * this.y,
                          this.window.width * this.width,
                          this.window.height * this.height);
    }
  }
}
