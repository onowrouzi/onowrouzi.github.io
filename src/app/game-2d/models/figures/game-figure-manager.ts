import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { ResourceLoaderCallback } from 'app/game-2d/utilities/resource-loaders/resource-loader';

import { each, reject } from 'lodash';

export enum GameFigureTypes {
  Enemy,
  Environment,
  Friend,
  UI
}

export class GameFigureManager {
  private static instance: GameFigureManager;

  private figures: GameFigure[];
  private figureList: {};

  private constructor() {
    this.figures = [];
    this.figureList = {
      [GameFigureTypes.Enemy]: new Array<GameFigure>(),
      [GameFigureTypes.Environment]: new Array<GameFigure>(),
      [GameFigureTypes.Friend]: new Array<GameFigure>(),
      [GameFigureTypes.UI]: new Array<GameFigure>()
    };
  }

  public static get() {
    return this.instance = this.instance || new this();
  }

  public query(type?: GameFigureTypes) {
    return type ? this.figureList[type] : this.figureList;
  }

  public add(f: GameFigure | GameFigure[], type: GameFigureTypes, delayLoad?: boolean, callback?: ResourceLoaderCallback) {
    this.figureList[type] = this.figureList[type].concat(f);

    if (!delayLoad) {
      if (Array.isArray(f)) {
        each(f, (l) => {
          callback = callback || (() => l.loaded = true);
          return this.load(l, callback);
        });
      } else {
        callback = callback || (() => f.loaded = true);
        this.load(f, callback);
      }
    }
  }

  public removeDeleted() {
    each(GameFigureTypes, (t) => {
      this.figureList[t] = reject(this.figureList[t], (f: GameFigure) => f.deleted);
    });
  }

  public loadAll(callback?: ResourceLoaderCallback) {
    each(this.figureList, (l) => {
      each(l, (f: GameFigure) => this.load(f, callback));
    });
  }

  private load(f: GameFigure, callback?: ResourceLoaderCallback) {
    return f.load(callback);
  }
}
