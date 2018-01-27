import { GameFigure } from 'app/game-2d/models/figures/game-figure';

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

  query(type?: GameFigureTypes) {
    return type ? this.figureList[type] : this.figureList;
  }

  add(f: GameFigure | GameFigure[], type: GameFigureTypes, delayLoad?: boolean) {
    return new Promise(async (res, rej) => {
      this.figureList[type] = this.figureList[type].concat(f);

      if (!delayLoad) {
        if (Array.isArray(f)) {
          for (let l of f) {
            await l.load();
          }
          res(true);
        } else {
          await f.load();
          res(true);
        }
      }

      res(true);
    });
  }

  removeDeleted() {
    each(GameFigureTypes, (t) => {
      this.figureList[t] = reject(this.figureList[t], (f: GameFigure) => f.deleted);
    });
  }

  loadAll() {
    each(this.figureList, (l) => {
      each(l, (f: GameFigure) => f.load());
    });
  }
}
