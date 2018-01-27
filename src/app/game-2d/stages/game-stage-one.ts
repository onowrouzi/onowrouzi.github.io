import { GameStage } from 'app/game-2d/stages/game-stage';
import { DialogBox } from 'app/game-2d/utilities/text-manager/dialog-box';
import { GrassTile } from 'app/game-2d/models/figures/top-down/environment/grass';
import { GameFigureTypes } from 'app/game-2d/models/figures/game-figure-manager';
import { DrinkVendingMachine } from 'app/game-2d/models/figures/top-down/environment/drink-vending-machine';
import { MuteButton } from 'app/game-2d/models/figures/top-down/ui/mute-button';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { Heart } from 'app/game-2d/models/figures/top-down/ui/heart';
import { Potion } from 'app/game-2d/models/figures/top-down/environment/potion';

export class GameStageOne extends GameStage {

  player: PlayerTopDownFigure;
  background: GrassTile;

  constructor() {
    super();
  }

  update() {
    this.background.update();
    super.update();
  }

  load(): Promise<boolean> {
    return new Promise<boolean>((async (res, rej) => {
      this.background = new GrassTile(0, 0, 0.1, 0.1, this.ctx);
      this.background.load();

      const potion = new Potion(0.1, 0.5, .05, .1, this.ctx);
      await this.figureManager.add(potion, GameFigureTypes.Environment);

      const vendingMachine = new DrinkVendingMachine(0.3, 0.3, 0.1, 0.25, this.ctx);
      await this.figureManager.add(vendingMachine, GameFigureTypes.Environment);

      this.player = new PlayerTopDownFigure(0.5, 0.5, 0.1, 0.2, this.ctx, 5);
      await this.figureManager.add(this.player, GameFigureTypes.Friend, false);

      const heart = new Heart(0, 5, 40, 40, this.ctx);
      await this.figureManager.add(heart, GameFigureTypes.UI);
      this.player.addObserver(heart);
      // this.dialogBox = new DialogBox(0, this.window.height * 0.7, this.window.width, this.window.height * 0.3, this.ctx);

      res(true);
    }).bind(this));
  }

  pause() {
    this.player.idle();
  }

}
