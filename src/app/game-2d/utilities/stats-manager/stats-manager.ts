import { IObserver } from 'app/game-2d/models/observer/observer';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { GameTimer } from 'app/game-2d/utilities/game-timer/game-timer';

export class StatsManager implements IObserver<PlayerTopDownFigure> {
  private static instance: StatsManager;

  timer: GameTimer;
  deleteObserver: boolean;
  score: number;

  private constructor() {
    this.score = 0;
    this.timer = new GameTimer();
  }

  public static get() {
    return this.instance = this.instance || new this();
  }

  onNotify(p: PlayerTopDownFigure) {
    this.score = p.score;
  }
}
