import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { KeyCode } from 'app/game-2d/utilities/key-handler/key-codes.enum';

import { each } from 'lodash';
import { TopDownSpriteState } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-sprite-state';
import { GameFigure } from 'app/game-2d/models/figures/game-figure';

export class GameKeyHandler {
  private static instance: GameKeyHandler;

  private activeKeys: number[];
  private lastKey: number;
  private target: GameFigure;

  constructor(target: GameFigure) {
    this.target = target;
    this.activeKeys = [];
    this.target.ctx.canvas.addEventListener('keydown', this.onKeyDown.bind(this));
    this.target.ctx.canvas.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  private onKeyDown(e: KeyboardEvent) {
    e.preventDefault();

    if (this.activeKeys.indexOf(e.keyCode || e.which) < 0) {
      this.activeKeys.push(e.keyCode || e.which);
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    const idx = this.activeKeys.indexOf(e.keyCode || e.which);
    if (idx >= 0) {
      this.activeKeys.splice(idx, 1);
    }
    if (this.activeKeys.length === 0) {
      this.target.movementHandler.idle();
    }

    this.lastKey = (e.keyCode || e.which) in KeyCode && (e.keyCode || e.which) !== KeyCode.ESC ? (e.keyCode || e.which) : this.lastKey;
  }

  isPressed(key: number): boolean {
    return this.activeKeys.indexOf(key) > -1;
  }

  getDirection(): TopDownSpriteState {
    const up = this.activeKeys.indexOf(KeyCode.UP);
    const down = this.activeKeys.indexOf(KeyCode.DOWN);
    const left = this.activeKeys.indexOf(KeyCode.LEFT);
    const right = this.activeKeys.indexOf(KeyCode.RIGHT);

    if ([up, down, left, right].every(d => d === -1)) {
      switch (this.lastKey) {
        case KeyCode.UP: return TopDownSpriteState.IDLE_UP;
        case KeyCode.DOWN: return TopDownSpriteState.IDLE_DOWN;
        case KeyCode.LEFT: return TopDownSpriteState.IDLE_LEFT;
        case KeyCode.RIGHT: return TopDownSpriteState.IDLE_RIGHT;
        default: return TopDownSpriteState.IDLE_DOWN;
      }
    }

    const last = Math.max(up, down, left, right);

    switch (last) {
      case up: return TopDownSpriteState.MOVE_UP;
      case down: return TopDownSpriteState.MOVE_DOWN;
      case left: return TopDownSpriteState.MOVE_LEFT;
      case right: return TopDownSpriteState.MOVE_RIGHT;
    }
  }

  getLastKey(): number {
    return this.lastKey;
  }

  clear() {
    this.lastKey = this.activeKeys.length > 0 ? this.activeKeys[this.activeKeys.length - 1] : this.lastKey;
    this.activeKeys = [];
  }

  handleKeys() {
    each(this.activeKeys, (k) => {
      switch (k) {
        case KeyCode.UP : this.target.movementHandler.moveUp(); break;
        case KeyCode.DOWN : this.target.movementHandler.moveDown(); break;
        case KeyCode.RIGHT : this.target.movementHandler.moveRight(); break;
        case KeyCode.LEFT : this.target.movementHandler.moveLeft(); break;
      }
    });
  }
}
