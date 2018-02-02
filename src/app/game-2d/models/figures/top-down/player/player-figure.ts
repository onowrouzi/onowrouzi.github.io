import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { GameKeyHandler } from 'app/game-2d/utilities/key-handler/key-handler';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { PlayerTopDownSprites } from 'app/game-2d/models/figures/top-down/player/sprites/sprites';
import { PlayerTopDownState } from 'app/game-2d/models/figures/top-down/player/states/player-states';
import { TopDownPlayerMovementHandler } from 'app/game-2d/models/figures/top-down/player/handlers/top-down-player-movement-handler';
import { IObservable } from 'app/game-2d/models/observer/observable';
import { IObserver } from 'app/game-2d/models/observer/observer';
import { StatsManager } from 'app/game-2d/utilities/stats-manager/stats-manager';
import { Vocalize } from 'app/game-2d/utilities/text-manager/vocalize';
import { DialogBox } from 'app/game-2d/utilities/text-manager/dialog-box';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';

import { each, reject } from 'lodash';

export class PlayerTopDownFigure extends GameSprite implements IObservable, Vocalize {

  private readonly MAX_HEALTH = 5;

  observers: IObserver<this>[];
  dialogBox: DialogBox;
  score: number;
  health: number;
  loaded: boolean;
  flashTimer: number;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, step?: number) {
    super(x, y, width, height, ctx, step);

    this.score = 0;
    this.health = 3;
    this.flashTimer = 0;
    this.state = PlayerTopDownState.IDLE_DOWN;
    this.movementHandler = new TopDownPlayerMovementHandler(this);
    this.observers = [StatsManager.get()];

    this.movementHandler.idle();

    this.dialogBox = new DialogBox(0, this.window.height * 0.7, this.window.width, this.window.height * 0.3, this.ctx);
    this.dialogBox.setOnStart(() => this.enableControls(false));
    this.dialogBox.setOnFinish(() => this.enableControls(true));
    this.startDialog('Hi! My name is Omid... Welcome to my site!');
  }

  async load() {
    for (let s of PlayerTopDownSprites.sprites) {
      this.spritesList[s.state] = await this.loader.load(s.sources, this.getWidth(), this.getHeight());
    }

    this.sprites = this.spritesList[this.state.toString()];
  }

  idle() {
    this.movementHandler.idle();
  }

  update() {
    this.notifyObservers();
    this.movementHandler.update();
    this.dialogBox.update();
    this.flashTimer = this.flashTimer > 0 ? this.flashTimer - 1 : this.flashTimer;
    if (this.flashTimer % 2 === 0) {
      this.render();
    }
  }

  getCollisionBox() {
    const c = super.getCollisionBox();
    c.left += this.getWidth() / 4;
    c.right -= this.getWidth() / 4;
    return c;
  }

  addObserver(o: IObserver<this>) {
    this.observers.push(o);
  }

  removeObserver(o?: IObserver<this>) {
    this.observers = reject(this.observers, {deleteObserver: true});
  }

  notifyObservers() {
    each(this.observers, (o: IObserver<this>) => o.onNotify(this));
    this.removeObserver();
  }

  enableControls(bool: boolean) {
    (<TopDownPlayerMovementHandler>this.movementHandler).enableControls(bool);
  }

  setDialog(txt: string) {
    this.dialogBox.setText(txt);
  }

  startDialog(txt?: string) {
    this.dialogBox.start(txt);
  }

  heal() {
    this.health = this.health < this.MAX_HEALTH ? this.health + 1 : this.health;
  }

  hurt() {
    if (this.flashTimer === 0) {
      this.flashTimer = 60;
      this.health = this.health > 0 ? this.health - 1 : this.health;
      this.movementHandler.moveBack();
    }
  }
}
