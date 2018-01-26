import { GameState } from 'app/game-2d/engine/game-state';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { GameFigureManager, GameFigureTypes } from 'app/game-2d/models/figures/game-figure-manager';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { GrassTile } from 'app/game-2d/models/figures/top-down/environment/grass';
import { MuteButton } from 'app/game-2d/models/figures/top-down/ui/mute-button';
import { GameSettings } from 'app/game-2d/utilities/settings/game-settings';
import { PauseMenuButton } from 'app/game-2d/models/figures/top-down/ui/pause-menu-button';
import { KeyCode } from 'app/game-2d/utilities/key-handler/key-codes.enum';
import { TextManager } from 'app/game-2d/utilities/text-manager/text-manager';
import { StatsManager } from 'app/game-2d/utilities/stats-manager/stats-manager';
import { Potion } from 'app/game-2d/models/figures/top-down/environment/potion';
import { Heart } from 'app/game-2d/models/figures/top-down/ui/heart';
import { ClickFigure } from 'app/game-2d/utilities/click-handler/click-figure';

import { Injectable } from '@angular/core';
import { each } from 'lodash';
import { DrinkVendingMachine } from 'app/game-2d/models/figures/top-down/environment/drink-vending-machine';
import { DialogBox } from 'app/game-2d/utilities/text-manager/dialog-box';

@Injectable()
export class GameEngine {
  private static instance: GameEngine;

  private FPS;
  private prevFrameTime = 0;
  private isLoading: boolean;
  private ctx: CanvasRenderingContext2D;

  dialogBox: DialogBox;
  background: GrassTile;
  player: PlayerTopDownFigure;
  settings: GameSettings;
  audio: HTMLAudioElement;
  muteBtn: MuteButton;
  pauseBtns: PauseMenuButton[];
  figureManager: GameFigureManager;
  txtMgr: TextManager;
  statsMgr: StatsManager;
  window: GameWindow;
  state: GameState;
  pauseKey = KeyCode.ESC;
  pausedText = 'PAUSED';
  readyText = 'PLAY';
  loadingText = 'LOADIING';

  private constructor(fps?: number) {
    const canvas = <HTMLCanvasElement>document.getElementById('game_canvas');
    canvas.width = canvas.width || canvas.parentElement.clientWidth;
    canvas.height = canvas.height || canvas.width * 0.5625;
    canvas.addEventListener('click', this.onClick.bind(this));
    canvas.addEventListener('blur', this.pause.bind(this));
    canvas.addEventListener('keydown', ((e) => {
      if (e.keyCode === this.pauseKey) {
        if (this.state === GameState.ACTIVE) {
          this.pause();
        } else if (this.state === GameState.PAUSED) {
          this.play();
        }
      }
    }).bind(this));

    this.FPS = fps || 20;
    this.ctx = canvas.getContext('2d');
    this.window = GameWindow.get();
    this.settings = GameSettings.get();
    this.figureManager = GameFigureManager.get();
    this.txtMgr = TextManager.get(this.ctx);
    this.statsMgr = StatsManager.get();

    this.audio = document.getElementById('game_audio_element') as HTMLAudioElement;
    this.audio.src = 'assets/audio/RoccoW_-_Nontinde_Vendor_Theme.mp3';
    this.audio.volume = 0.5;

    this.pauseBtns = [
      new PauseMenuButton(0.5, 0.5, 0.3, 0.1, this.ctx, this.play.bind(this), 'RESUME'),
    ];

    this.start();
  }

  public static get(fps?: number) {
    return this.instance = this.instance || new this(fps);
  }

  private gameLoop(time: number) {
    setTimeout(() => {
      const id = requestAnimationFrame(this.gameLoop.bind(this));
      const diff = time - this.prevFrameTime;

      if (diff < 1000 / this.FPS) {
        return;
      }

      // console.log(1 / ((time - this.prevFrameTime) / 1000));

      this.clear();
      this.draw();
      this.prevFrameTime = time;
    }, 1000 / this.FPS);
  }

  private clear() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.window.width, this.window.height);
    this.ctx.save();
  }

  private draw() {
    this.ctx.beginPath();

    this.figureManager.removeDeleted();

    this.background.update();

    const time = new Date(this.statsMgr.timer.time * 1000).toISOString().substr(14, 5);
    this.txtMgr.drawText(' ' + time, this.window.height * 0.99, null, 'left', 'white', 6);
    this.txtMgr.drawText('SCORE: ' + this.statsMgr.score + ' ', this.window.height * 0.065, null, 'right', 'white', 6);

    const figures = this.figureManager.query();
    each(figures, (list) => each(list, (f: GameFigure) => f.update()));

    switch (this.state) {
      case GameState.READY:
        this.txtMgr.drawText(this.readyText, this.window.height * 0.3);
        break;
      case GameState.ACTIVE:
        this.dialogBox.update();
        this.detectCollision(figures[GameFigureTypes.Environment], figures[GameFigureTypes.Friend]);
        this.detectCollision(figures[GameFigureTypes.Enemy], figures[GameFigureTypes.Friend]);
        break;
      case GameState.LOADING:
        this.txtMgr.drawText(this.loadingText, this.window.height * 0.3);
        break;
      case GameState.PAUSED:
        this.player.enableControls(false);
        this.dialogBox.update();
        this.txtMgr.drawText(this.pausedText, this.window.height * 0.3);
        each(this.pauseBtns, (pb) => pb.render());
        break;
    }

    this.ctx.restore();
  }

  private detectCollision(l1: GameFigure[], l2: GameFigure[]) {
    each(l1, (f1: GameFigure) => {
      each(l2, (f2: GameFigure) => {
        f1.detectCollision(f2);
      });
    });
  }

  onClick(e: MouseEvent) {
    if (this.state === GameState.READY) {
      return this.play();
    }

    if (this.state === GameState.PAUSED) {
      each(this.pauseBtns, (pb) => pb.onClick(e));
    } else if (this.state === GameState.ACTIVE) {
      this.muteBtn.onClick(e);
      this.audio.muted = this.settings.muted;
      this.dialogBox.onClick(e);
    }
  }

  start() {
    this.background = new GrassTile(0, 0, 0.1, 0.1, this.ctx);

    const potion = new Potion(0.1, 0.5, .05, .1, this.ctx);
    this.figureManager.add(potion, GameFigureTypes.Environment);

    const vendingMachine = new DrinkVendingMachine(0.3, 0.3, 0.1, 0.25, this.ctx);
    this.figureManager.add(vendingMachine, GameFigureTypes.Environment);

    this.muteBtn = new MuteButton(0.9, 0.9, 0.1, 0.1, this.ctx);
    this.figureManager.add(this.muteBtn, GameFigureTypes.UI);

    this.player = new PlayerTopDownFigure(0.5, 0.5, 0.1, 0.2, this.ctx, 5);
    this.figureManager.add(this.player, GameFigureTypes.Friend, false, ((loaded: boolean) => {
      this.state = GameState.READY;
      this.isLoading = false;
    }).bind(this));

    const heart = new Heart(0, 5, 40, 40, this.ctx);
    this.figureManager.add(heart, GameFigureTypes.UI);
    this.player.addObserver(heart);

    this.dialogBox = new DialogBox(0, this.window.height * 0.7, this.window.width, this.window.height * 0.3, this.ctx);

    this.load();
  }

  play() {
    this.statsMgr.timer.start(this.state === GameState.READY ? 0 : this.statsMgr.timer.time);
    this.state = GameState.ACTIVE;
    this.dialogBox.setOnStart(() => this.player.enableControls(false));
    this.dialogBox.setOnFinish(() => this.player.enableControls(true));
    this.dialogBox.start('Hi! My name is Omid and this is my site. Wanna take the tour?');
    if (!this.settings.muted) {
      this.audio.play();
    }

    this.gameLoop(0);
  }

  pause() {
    this.state = GameState.PAUSED;
    this.statsMgr.timer.stop();
    if (!this.settings.muted) {
      this.audio.pause();
    }
    this.dialogBox.start('Now I\'m paused...');
    this.player.movementHandler.idle();
  }

  load() {
    this.isLoading = true;
    this.state = GameState.LOADING;
    this.settings.muted = false;
    this.gameLoop(0);
  }
}
