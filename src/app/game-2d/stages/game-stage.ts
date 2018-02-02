import { GameFigureManager, GameFigureTypes } from 'app/game-2d/models/figures/game-figure-manager';
import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { GameState } from 'app/game-2d/engine/game-state';
import { ClickableFigure } from 'app/game-2d/utilities/click-handler/clickable-figure';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';

import { each, pick, omit, sortBy } from 'lodash';

export abstract class GameStage {
  ctx: CanvasRenderingContext2D;
  window: GameWindow;
  player: PlayerTopDownFigure;
  figureManager: GameFigureManager;

  constructor() {
    this.window = GameWindow.get();
    this.ctx = this.window.canvas.getContext('2d');
    this.figureManager = GameFigureManager.get();
  }

  update(state: GameState) {
    this.figureManager.removeDeleted();

    each(this.figureManager.query(GameFigureTypes.Background), (f) => f.update());
    const ui = this.figureManager.query(GameFigureTypes.UI);
    const others = omit(this.figureManager.query(), [GameFigureTypes.UI, GameFigureTypes.Background]);

    let figures = [];
    each(others, (l) => {
      figures = figures.concat(l);
    });

    figures = ui.concat(sortBy(figures, ['z', (f: GameFigure) => f.getTop(), 'x']));

    each(figures, (f: GameFigure) => {
      if (state === GameState.ACTIVE) {
        if (this.player) {
          this.player.enableControls(true);
        }
        f.update();
      } else {
        if (this.player) {
          this.player.enableControls(false);
        }
        f.render();
      }
    });

    figures = this.figureManager.query();
    this.detectCollision(figures[GameFigureTypes.Environment], figures[GameFigureTypes.Friend]);
    this.detectCollision(figures[GameFigureTypes.Environment], figures[GameFigureTypes.Enemy]);
    this.detectCollision(figures[GameFigureTypes.Enemy], figures[GameFigureTypes.Friend]);
  }

  abstract load(): Promise<boolean>;

  abstract pause();

  async reset() {
    this.figureManager.clear();
    await this.load();
  }

  private detectCollision(l1: GameFigure[], l2: GameFigure[]) {
    each(l1, (f1: GameFigure) => {
      each(l2, (f2: GameFigure) => {
        f1.onCollision(f2);
        f2.onCollision(f1);
      });
    });
  }
}
