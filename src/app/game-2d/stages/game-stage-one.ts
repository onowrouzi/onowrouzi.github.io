import { GameStage } from 'app/game-2d/stages/game-stage';
import { DialogBox } from 'app/game-2d/utilities/text-manager/dialog-box';
import { GrassTile } from 'app/game-2d/models/figures/top-down/environment/grass';
import { GameFigureTypes } from 'app/game-2d/models/figures/game-figure-manager';
import { DrinkVendingMachine } from 'app/game-2d/models/figures/top-down/environment/drink-vending-machine';
import { MuteButton } from 'app/game-2d/models/figures/top-down/ui/mute-button';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { Heart } from 'app/game-2d/models/figures/top-down/ui/heart';
import { Potion } from 'app/game-2d/models/figures/top-down/environment/potion';
import { GameState } from 'app/game-2d/engine/game-state';
import { SnacksVendingMachine } from 'app/game-2d/models/figures/top-down/environment/food-vending-machine';
import { Desk } from 'app/game-2d/models/figures/top-down/environment/desk';
import { OfficeTile } from 'app/game-2d/models/figures/top-down/environment/office-tile';
import { Coffee } from 'app/game-2d/models/figures/top-down/environment/coffee';
import { Monitor } from 'app/game-2d/models/figures/top-down/environment/monitor';
import { Keyboard } from 'app/game-2d/models/figures/top-down/environment/keyboard';
import { Mouse } from 'app/game-2d/models/figures/top-down/environment/mouse';
import { WaterCooler } from 'app/game-2d/models/figures/top-down/environment/water-cooler';

export class GameStageOne extends GameStage {

  background: GrassTile;

  constructor() {
    super();
  }

  update(state: GameState) {
    super.update(state);
  }

  load(): Promise<boolean> {
    return new Promise<boolean>((async (res, rej) => {
      this.background = new OfficeTile(0, 0, 0.1, 0.1, this.ctx);
      await this.figureManager.add(this.background, GameFigureTypes.Background);

      const drinkVendingMachine = new DrinkVendingMachine(0.3, 0, 0.1, 0.25, this.ctx);
      await this.figureManager.add(drinkVendingMachine, GameFigureTypes.Environment);
      const snackVendingMachine = new SnacksVendingMachine(0.4, 0, 0.1, 0.25, this.ctx);
      await this.figureManager.add(snackVendingMachine, GameFigureTypes.Environment);
      const waterCooler = new WaterCooler(0.5, 0, 0.05, 0.2, this.ctx);
      await this.figureManager.add(waterCooler, GameFigureTypes.Environment);
      const desk = new Desk(0.7, 0.5, 0.2, 0.15, this.ctx);
      await this.figureManager.add(desk, GameFigureTypes.Environment);
      const monitor = new Monitor(0.71, 0.45, 0.1, 0.085, this.ctx, 1);
      await this.figureManager.add(monitor, GameFigureTypes.Environment);
      const keyboard = new Keyboard(0.725, 0.545, 0.06, 0.035, this.ctx);
      await this.figureManager.add(keyboard, GameFigureTypes.Environment);
      const mouse = new Mouse(0.8, 0.55, 0.015, 0.025, this.ctx);
      await this.figureManager.add(mouse, GameFigureTypes.Environment);
      let coffee = new Coffee(0.85, 0.52, .015, .03, this.ctx);
      await this.figureManager.add(coffee, GameFigureTypes.Environment);

      coffee = new Coffee(0.1, 0.5, .02, .04, this.ctx);
      await this.figureManager.add(coffee, GameFigureTypes.Environment);
      coffee = new Coffee(0.2, 0.5, .02, .04, this.ctx);
      await this.figureManager.add(coffee, GameFigureTypes.Environment);
      coffee = new Coffee(0.3, 0.5, .02, .04, this.ctx);
      await this.figureManager.add(coffee, GameFigureTypes.Environment);

      const heart = new Heart(0, 5, 40, 40, this.ctx);
      await this.figureManager.add(heart, GameFigureTypes.UI);

      this.player = new PlayerTopDownFigure(0.5, 0.5, 0.075, 0.2, this.ctx, 5);
      await this.figureManager.add(this.player, GameFigureTypes.Friend, false);
      this.player.addObserver(heart);

      res(true);
    }).bind(this));
  }

  pause() {
    this.player.idle();
  }

}
