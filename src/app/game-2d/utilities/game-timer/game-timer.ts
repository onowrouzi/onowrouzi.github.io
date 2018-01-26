import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

export class GameTimer {
  private timer: Subscription;
  time: number;

  constructor() {
    this.time = 0;
  }

  start(time: number) {
    this.time = time || 0;
    this.timer = Observable.timer(1000, 1000).subscribe(() => this.time++);
  }

  resume() {
    this.start(this.time);
  }

  stop() {
    this.timer.unsubscribe();
  }
}
