import { GameState } from 'app/game-2d/engine/game-state';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { GrassTile } from 'app/game-2d/models/figures/top-down/environment/grass';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';
import { GameFigureManager, GameFigureTypes } from 'app/game-2d/models/figures/game-figure-manager';
import { MuteButton } from 'app/game-2d/models/figures/top-down/ui/mute-button';
import { GameSettings } from 'app/game-2d/utilities/settings/game-settings';
import { PauseMenuButton } from 'app/game-2d/models/figures/top-down/ui/pause-menu-button';
import { ClickFigure } from 'app/game-2d/models/figures/click-figure';
import { KeyCode } from 'app/game-2d/utilities/key-handler/key-codes.enum';
import { TextManager } from 'app/game-2d/utilities/text-manager/text-manager';

import { each } from 'lodash';
import { StatsManager } from 'app/game-2d/utilities/stats-manager/stats-manager';
import { Potion } from 'app/game-2d/models/figures/top-down/environment/potion';
import { Heart } from 'app/game-2d/models/figures/top-down/ui/heart';

export class GameEngine {
  private static instance: GameEngine;

  private readonly FPS = 30;

  private prevFrameTime = 0;
  private isLoading: boolean;
  private background: GrassTile;
  private player: PlayerTopDownFigure;
  private window: GameWindow;
  private settings: GameSettings;
  private audio: HTMLAudioElement;
  private muteBtn: MuteButton;
  private pauseBtns: PauseMenuButton[];
  private figureManager: GameFigureManager;
  private txtMgr: TextManager;
  private statsMgr: StatsManager;

  ctx: CanvasRenderingContext2D;
  state: GameState;
  pauseKey = KeyCode.ESC;
  pausedText = 'PAUSED';
  readyText = 'PLAY';
  loadingText = 'LOADIING';

  private constructor(canvas: HTMLCanvasElement, window: GameWindow) {
    this.ctx = canvas.getContext('2d');
    canvas.addEventListener('click', this.handleClickEvent.bind(this));
    canvas.addEventListener('keydown', ((e) => {
      if (e.keyCode === this.pauseKey) {
        if (this.state === GameState.ACTIVE) {
          this.pause();
        } else if (this.state === GameState.PAUSED) {
          this.play();
        }
      }
    }).bind(this));

    this.window = window;
    this.settings = GameSettings.get();
    this.figureManager = GameFigureManager.get();
    this.txtMgr = TextManager.get(this.ctx);
    this.statsMgr = StatsManager.get();

    this.audio = document.getElementById('game_audio_element') as HTMLAudioElement;
    this.audio.src = 'assets/audio/RoccoW_-_Nontinde_Vendor_Theme.mp3';
    this.audio.volume = 0.5;

    this.pauseBtns = [
      new PauseMenuButton(0.5, 0.5, 0.3, 0.1, this.ctx, 'RESUME', this.play.bind(this)),
    ];

    this.start();
  }

  public static get() {
    const canvas = <HTMLCanvasElement>document.getElementById('game_canvas');
    return this.instance = this.instance || new this(canvas, GameWindow.get());
  }

  private gameLoop(time: number) {
    setTimeout(() => {
      const id = requestAnimationFrame(this.gameLoop.bind(this));
      const diff = time - this.prevFrameTime;

      if (diff < 1000 / this.FPS) {
        return;
      }

      if (this.state === GameState.ACTIVE) {
        this.player.keyHandler.handleKeys();
      }

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
    const figures = this.figureManager.query();
    each(figures, (list) => each(list, (f: GameFigure) => f.update()));

    const time = new Date(this.statsMgr.time * 1000).toISOString().substr(14, 5);
    this.txtMgr.drawText(' ' + time, this.window.height * 0.99, null, 'left', 'white', 4);
    this.txtMgr.drawText('SCORE: ' + this.statsMgr.score + ' ', this.window.height * 0.065, null, 'right', 'white', 4);

    switch (this.state) {
      case GameState.READY:
        this.txtMgr.drawText(this.readyText, this.window.height * 0.3);
        break;
      case GameState.ACTIVE:
        this.detectCollision(figures[GameFigureTypes.Environment], figures[GameFigureTypes.Friend]);
        this.detectCollision(figures[GameFigureTypes.Enemy], figures[GameFigureTypes.Friend]);
        break;
      case GameState.LOADING:
        this.txtMgr.drawText(this.loadingText, this.window.height * 0.3);
        break;
      case GameState.PAUSED:
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

  handleClickEvent(e) {
    const r = this.ctx.canvas.getBoundingClientRect();
    const clickFigure = new ClickFigure(e.clientX - r.left, e.clientY - r.top, 0.01, 0.01, this.ctx);
    const figures = this.figureManager.query();
    if (this.state === GameState.PAUSED) {
      each(this.pauseBtns, (pb) => pb.detectCollision(clickFigure));
    } else if (this.state === GameState.ACTIVE) {
      this.muteBtn.detectCollision(clickFigure);
      this.audio.muted = this.settings.muted;
    }
  }

  start() {
    this.background = new GrassTile(0, 0, 0.1, 0.1, this.ctx);
    this.figureManager.add(this.background, GameFigureTypes.Environment);

    const potion = new Potion(0.1, 0.5, 0.05, 0.1, this.ctx);
    this.figureManager.add(potion, GameFigureTypes.Environment);

    this.muteBtn = new MuteButton(0.9, 0.9, 0.1, 0.1, this.ctx);
    this.figureManager.add(this.muteBtn, GameFigureTypes.UI);

    this.player = new PlayerTopDownFigure(0.5, 0.5, 0.1, 0.2, this.ctx, 0.01);
    this.figureManager.add(this.player, GameFigureTypes.Friend, false, ((loaded: boolean) => {
      this.state = GameState.READY;
      this.isLoading = false;
    }).bind(this));

    const heart = new Heart(0, 0.1, 0.05, 0.1, this.ctx);
    this.figureManager.add(heart, GameFigureTypes.UI);
    this.player.addObserver(heart);

    this.load();
  }

  play() {
    this.statsMgr.startTimer(this.state === GameState.READY ? 0 : this.statsMgr.time);
    this.state = GameState.ACTIVE;
    if (!this.settings.muted) {
      this.audio.play();
    }
    this.gameLoop(0);
  }

  pause() {
    this.state = GameState.PAUSED;
    this.statsMgr.stopTimer();
    if (!this.settings.muted) {
      this.audio.pause();
    }
    this.player.movementHandler.idle();
    this.player.keyHandler.clear();
  }

  load() {
    this.isLoading = true;
    this.state = GameState.LOADING;
    this.settings.muted = false;
    this.gameLoop(0);
  }
}
