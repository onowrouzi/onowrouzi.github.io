import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { PauseMenuButton } from 'app/game-2d/models/figures/top-down/ui/pause-menu-button';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';

export class ClickFigure extends GameFigure {

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  render() {}
}
