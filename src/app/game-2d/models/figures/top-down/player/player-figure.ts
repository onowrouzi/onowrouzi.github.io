import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { GameKeyHandler } from 'app/game-2d/utilities/key-handler/key-handler';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { ResourceLoaderCallback } from 'app/game-2d/utilities/resource-loaders/resource-loader';
import { PlayerTopDownSprites } from 'app/game-2d/models/figures/top-down/player/sprites/sprites';
import { PlayerTopDownState } from 'app/game-2d/models/figures/top-down/player/states/player-states';
import { TopDownPlayerMovementHandler } from 'app/game-2d/models/figures/top-down/player/handlers/top-down-player-movement-handler';
import { IObservable } from 'app/game-2d/models/observer/observable';
import { IObserver } from 'app/game-2d/models/observer/observer';
import { StatsManager } from 'app/game-2d/utilities/stats-manager/stats-manager';

import { each } from 'lodash';

export class PlayerTopDownFigure extends GameSprite implements IObservable {

  observers: IObserver<this>[];
  keyHandler: GameKeyHandler;
  score: number;
  health: number;
  state: string;
  loaded: boolean;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, step?: number) {
    super(x, y, width, height, ctx, step);

    this.score = 0;
    this.health = 3;
    this.state = PlayerTopDownState.IDLE_DOWN;
    this.movementHandler = new TopDownPlayerMovementHandler(this);
    this.keyHandler = GameKeyHandler.get(this);
    this.isLoaded.bind(this);

    this.observers = [StatsManager.get()];

    this.movementHandler.idle();
  }

  load(callback?: ResourceLoaderCallback) {
    each(PlayerTopDownSprites.sprites, (s) => {
      this.spritesList[s.state] = this.loader.load(s.sources, this.width, this.height,
                                      (loaded: boolean) => this.isLoaded(loaded, callback));
    });
  }

  isLoaded(loaded: boolean, callback?: ResourceLoaderCallback) {
    if (loaded) {
      this.loaded = true;
      this.sprites = this.spritesList[this.state];
      if (callback) {
        callback(true);
      }
    }
  }

  update() {
    this.notifyObservers();
    super.update();
  }

  addObserver(o: IObserver<this>) {
    this.observers.push(o);
  }

  removeObserver(o: IObserver<this>) {

  }

  notifyObservers() {
    each(this.observers, (o: IObserver<this>) => o.onNotify(this));
  }
}
