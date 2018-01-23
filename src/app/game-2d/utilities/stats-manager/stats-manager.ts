import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IObserver } from 'app/game-2d/models/observer/observer';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';

export class StatsManager implements IObserver<PlayerTopDownFigure> {
  private static instance: StatsManager;

  private timer: Subscription;

  score: number;
  time: number;

  private constructor() {
    this.score = 0;
    this.time = 0;
  }

  public static get() {
    return this.instance = this.instance || new this();
  }

  startTimer(time: number) {
    this.time = time || 0;
    this.timer = Observable.timer(1000, 1000).subscribe(() => this.time++);
  }

  stopTimer() {
    this.timer.unsubscribe();
  }

  onNotify(p: PlayerTopDownFigure) {
    this.score = p.score;
  }
}
