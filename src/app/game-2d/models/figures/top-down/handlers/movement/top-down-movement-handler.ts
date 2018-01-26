import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { TopDownSpriteState } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-sprite-state';
import { GameKeyHandler } from 'app/game-2d/utilities/key-handler/key-handler';
import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { KeyCode } from 'app/game-2d/utilities/key-handler/key-codes.enum';

export class TopDownMovementHandler {
  target: GameFigure;

  constructor(target: GameFigure) {
    this.target = target;
  }

  idle(state?: TopDownSpriteState) {
    if (state) {
      this.target.setState(state);
    }
  }

  moveLeft(state?: TopDownSpriteState) {
    if (state) {
      this.target.setState(state);
    }
    this.target.x = this.target.x > 0 ? this.target.x - this.target.step : this.target.x;
  }

  moveRight(state?: TopDownSpriteState) {
    if (state) {
      this.target.setState(state);
    }
    this.target.x = this.target.window.width * (this.target.x + this.target.width) < this.target.window.width ?
                      this.target.x + this.target.step : this.target.x;
  }

  moveUp(state?: TopDownSpriteState) {
    if (state) {
      this.target.setState(state);
    }
    this.target.y = this.target.y > 0 ? this.target.y - this.target.step : this.target.y;
  }

  moveDown(state?: TopDownSpriteState) {
    if (state) {
      this.target.setState(state);
    }
    this.target.y = this.target.window.height * (this.target.y + this.target.height) < this.target.window.height ?
                      this.target.y + this.target.step : this.target.y;
  }

  moveBack() {}

  update() {}
}
