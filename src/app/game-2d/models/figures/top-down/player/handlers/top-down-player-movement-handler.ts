import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { PlayerTopDownState } from 'app/game-2d/models/figures/top-down/player/states/player-states';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { TopDownMovementHandler } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-movement-handler';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';

import { each } from 'lodash';
import { GameFigureManager, GameFigureTypes } from 'app/game-2d/models/figures/game-figure-manager';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { GameKeyHandler } from 'app/game-2d/utilities/key-handler/key-handler';
import { KeyCode } from 'app/game-2d/utilities/key-handler/key-codes.enum';

export class TopDownPlayerMovementHandler extends TopDownMovementHandler {

  keyHandler: GameKeyHandler;
  controlsEnabled: boolean;

  constructor(player: PlayerTopDownFigure) {
    super(player);

    this.controlsEnabled = true;
    this.keyHandler = GameKeyHandler.get(this.target);
  }

  idle(state?: PlayerTopDownState) {
    if (state) {
      this.target.setState(state);
    }

    this.keyHandler.clear();
  }

  moveBack() {
    const direction = this.keyHandler.getDirection();

    if (this.keyHandler.isPressed(KeyCode.LEFT)) {
      this.moveRight(direction);
    }
    if (this.keyHandler.isPressed(KeyCode.RIGHT)) {
      this.moveLeft(direction);
    }
    if (this.keyHandler.isPressed(KeyCode.UP)) {
      this.moveDown(direction);
    }
    if (this.keyHandler.isPressed(KeyCode.DOWN)) {
      this.moveUp(direction);
    }
  }

  handleDirection() {
    const s = this.keyHandler.getDirection();
    if (s !== this.target.state) {
      this.target.setState(s);
    }
  }

  update() {
    if (this.controlsEnabled) {
      this.keyHandler.handleKeys();
      this.handleDirection();
    }
  }

  enableControls(bool: boolean) {
    this.controlsEnabled = bool;
  }
}

