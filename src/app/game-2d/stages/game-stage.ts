import { GameFigureManager, GameFigureTypes } from 'app/game-2d/models/figures/game-figure-manager';
import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { ClickableFigure } from 'app/game-2d/utilities/click-handler/clickable-figure';

import { each } from 'lodash';

export abstract class GameStage {
  ctx: CanvasRenderingContext2D;
  window: GameWindow;
  figureManager: GameFigureManager;

  constructor() {
    this.window = GameWindow.get();
    this.ctx = this.window.canvas.getContext('2d');
    this.figureManager = GameFigureManager.get();
  }

  update(paused?: boolean) {
    this.figureManager.removeDeleted();

    const figures = this.figureManager.query();

    each(figures, (list) => each(list, (f: GameFigure) => {
      if (paused) {
        f.render();
      } else {
        f.update();
      }
    }));

    this.detectCollision(figures[GameFigureTypes.Environment], figures[GameFigureTypes.Friend]);
    this.detectCollision(figures[GameFigureTypes.Environment], figures[GameFigureTypes.Enemy]);
    this.detectCollision(figures[GameFigureTypes.Enemy], figures[GameFigureTypes.Friend]);
  }

  onClick(e: MouseEvent) {
    const figures = this.figureManager.query();

    each(figures, (list) =>
      each(list, (f: GameFigure) => {
        if (f instanceof ClickableFigure) {
          (<ClickableFigure>f).onClick(e);
        }
      })
    );
  }

  abstract load(): Promise<boolean>;

  abstract pause();

  private detectCollision(l1: GameFigure[], l2: GameFigure[]) {
    each(l1, (f1: GameFigure) => {
      each(l2, (f2: GameFigure) => {
        f1.onCollision(f2);
        f2.onCollision(f1);
      });
    });
  }
}
