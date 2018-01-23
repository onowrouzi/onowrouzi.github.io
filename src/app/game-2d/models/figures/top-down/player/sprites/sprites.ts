import { PlayerTopDownState } from 'app/game-2d/models/figures/top-down/player/states/player-states';
import { PlayerTopDownIdleLeft } from 'app/game-2d/models/figures/top-down/player/sprites/idle-left';
import { PlayerTopDownIdleRight } from 'app/game-2d/models/figures/top-down/player/sprites/idle-right';
import { PlayerTopDownMoveLeft } from 'app/game-2d/models/figures/top-down/player/sprites/move-left';
import { PlayerTopDownMoveRight } from 'app/game-2d/models/figures/top-down/player/sprites/move-right';
import { PlayerTopDownIdleUp } from 'app/game-2d/models/figures/top-down/player/sprites/idle-up';
import { PlayerTopDownIdleDown } from 'app/game-2d/models/figures/top-down/player/sprites/idle-down';
import { PlayerTopDownMoveDown } from 'app/game-2d/models/figures/top-down/player/sprites/move-down';
import { PlayerTopDownMoveUp } from 'app/game-2d/models/figures/top-down/player/sprites/move-up';

export class PlayerTopDownSprites {
  static sprites = [
    {state: PlayerTopDownState.IDLE_LEFT, sources: PlayerTopDownIdleLeft.sprites},
    {state: PlayerTopDownState.IDLE_RIGHT, sources: PlayerTopDownIdleRight.sprites},
    {state: PlayerTopDownState.IDLE_UP, sources: PlayerTopDownIdleUp.sprites},
    {state: PlayerTopDownState.IDLE_DOWN, sources: PlayerTopDownIdleDown.sprites},
    {state: PlayerTopDownState.MOVE_LEFT, sources: PlayerTopDownMoveLeft.sprites},
    {state: PlayerTopDownState.MOVE_RIGHT, sources: PlayerTopDownMoveRight.sprites},
    {state: PlayerTopDownState.MOVE_DOWN, sources: PlayerTopDownMoveDown.sprites},
    {state: PlayerTopDownState.MOVE_UP, sources: PlayerTopDownMoveUp.sprites}
  ];
}
