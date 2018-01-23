import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { PlayerTopDownState } from 'app/game-2d/models/figures/top-down/player/states/player-states';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { TopDownMovementHandler } from 'app/game-2d/models/figures/top-down/handlers/movement/top-down-movement-handler';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';

import { each } from 'lodash';
import { GameFigureManager, GameFigureTypes } from 'app/game-2d/models/figures/game-figure-manager';

export class TopDownPlayerMovementHandler extends TopDownMovementHandler {
}

