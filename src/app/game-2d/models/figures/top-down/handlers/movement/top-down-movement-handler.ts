import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { PlayerTopDownIdleUp } from 'app/game-2d/models/figures/top-down/player/sprites/idle-up';
import { TopDownSpriteState } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-sprite-state';
import { GameFigureManager } from 'app/game-2d/models/figures/game-figure-manager';

export class TopDownMovementHandler {
  target: GameSprite;
  window: GameWindow;
  figureManager: GameFigureManager;

  constructor(target: GameSprite) {
    this.target = target;
    this.window = GameWindow.get();
    this.figureManager = GameFigureManager.get();
  }

  idle(state?: TopDownSpriteState) {
    if (this.isFacingUp()) {
      this.target.state = TopDownSpriteState.IDLE_UP;
    } else if (this.isFacingDown()) {
      this.target.state = TopDownSpriteState.IDLE_DOWN;
    } else if (this.isFacingLeft()) {
      this.target.state = TopDownSpriteState.IDLE_LEFT;
    } else if (this.isFacingRight()) {
      this.target.state = TopDownSpriteState.IDLE_RIGHT;
    }

    this.target.sprites = this.target.spritesList[this.target.state];
  }

  moveLeft(state?: string) {
    if (state) {
      this.target.state = state;
    } else if (this.target.state !== TopDownSpriteState.MOVE_LEFT && this.target.state !== TopDownSpriteState.ATTACK_LEFT) {
      this.target.state = TopDownSpriteState.MOVE_LEFT;
    }

    this.target.sprites = this.target.spritesList[this.target.state];
    this.target.x = this.target.x > 0 ? this.target.x - this.target.step : this.target.x;
  }

  moveRight(state?: string) {
    if (state) {
      this.target.state = state;
    } else if (this.target.state !== TopDownSpriteState.MOVE_RIGHT && this.target.state !== TopDownSpriteState.ATTACK_RIGHT) {
      this.target.state = TopDownSpriteState.MOVE_RIGHT;
    }

    this.target.sprites = this.target.spritesList[this.target.state];
    this.target.x = this.window.width * (this.target.x + this.target.width) < this.window.width ?
                      this.target.x + this.target.step : this.target.x;
  }

  moveUp(state?: string) {
    if (state) {
      this.target.state = state;
    } else if (!this.isFacingUp()) {
      this.target.state = !this.target.spritesList[TopDownSpriteState.MOVE_UP] ?
                            (this.isFacingLeft() ? TopDownSpriteState.MOVE_LEFT : TopDownSpriteState.MOVE_RIGHT) :
                              TopDownSpriteState.MOVE_UP;
    }

    this.target.sprites = this.target.spritesList[this.target.state];
    this.target.y = this.target.y > 0 ? this.target.y - this.target.step : this.target.y;
  }

  moveDown(state?: string) {
    if (state) {
      this.target.state = state;
    } else if (!this.isFacingDown()) {
      this.target.state = !this.target.spritesList[TopDownSpriteState.MOVE_DOWN] ?
                            (this.isFacingLeft() ? TopDownSpriteState.MOVE_LEFT : TopDownSpriteState.MOVE_RIGHT) :
                              TopDownSpriteState.MOVE_DOWN;
    } else {
      this.target.state = TopDownSpriteState.MOVE_DOWN;
    }

    this.target.sprites = this.target.spritesList[this.target.state];
    this.target.y = this.window.height * (this.target.y + this.target.height) < this.window.height ?
                      this.target.y + this.target.step : this.target.y;
  }

  isFacingLeft() {
    return this.target.state === TopDownSpriteState.ATTACK_LEFT ||
            this.target.state === TopDownSpriteState.MOVE_LEFT ||
            this.target.state === TopDownSpriteState.IDLE_LEFT;
  }

  isFacingRight() {
    return this.target.state === TopDownSpriteState.ATTACK_RIGHT ||
            this.target.state === TopDownSpriteState.MOVE_RIGHT ||
            this.target.state === TopDownSpriteState.IDLE_RIGHT;
  }

  isFacingUp() {
    return this.target.state === TopDownSpriteState.ATTACK_UP ||
            this.target.state === TopDownSpriteState.MOVE_UP ||
            this.target.state === TopDownSpriteState.IDLE_UP;
  }

  isFacingDown() {
    return this.target.state === TopDownSpriteState.ATTACK_DOWN ||
            this.target.state === TopDownSpriteState.MOVE_DOWN ||
            this.target.state === TopDownSpriteState.IDLE_DOWN;
  }
}

