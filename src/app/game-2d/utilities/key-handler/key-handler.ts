import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { KeyCode } from 'app/game-2d/utilities/key-handler/key-codes.enum';
import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { GameEngine } from 'app/game-2d/engine/game-engine';

import { each } from 'lodash';

export class GameKeyHandler {
  private static instance: GameKeyHandler;

  activeKeys: number[];
  target: GameSprite;

  private constructor(target?: GameSprite) {
    this.target = target;
    this.activeKeys = [];
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  public static get(target?: GameSprite) {
    return this.instance = this.instance || new this(target);
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
  }

  clear() {
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
