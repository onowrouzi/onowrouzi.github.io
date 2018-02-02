import { Subject } from 'rxjs/Subject';
import { ClickAction } from 'app/game-2d/utilities/click-handler/clickable-figure';
import { Observable } from 'rxjs/Observable';

export class ClickBroadcastService {
  private static instance: ClickBroadcastService;
  private clicks: MouseEvent[];

  private constructor() {
    this.clicks = [];
  }

  public static get() {
    return this.instance = this.instance || new this();
  }

  public add(e: MouseEvent) {
    return this.clicks.push(e);
  }

  public getClicks(): MouseEvent[] {
    return this.clicks;
  }

  public clear() {
    this.clicks = [];
  }
}
