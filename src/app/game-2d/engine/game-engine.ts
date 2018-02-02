import { GameState } from 'app/game-2d/engine/game-state';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { GameStageOne } from 'app/game-2d/stages/game-stage-one';
import { GameStage } from 'app/game-2d/stages/game-stage';
import { GameSettings } from 'app/game-2d/utilities/settings/game-settings';
import { PauseMenuButton } from 'app/game-2d/models/figures/top-down/ui/pause-menu-button';
import { MuteButton } from 'app/game-2d/models/figures/top-down/ui/mute-button';
import { KeyCode } from 'app/game-2d/utilities/key-handler/key-codes.enum';
import { TextManager } from 'app/game-2d/utilities/text-manager/text-manager';
import { StatsManager } from 'app/game-2d/utilities/stats-manager/stats-manager';

import { Injectable } from '@angular/core';
import { each } from 'lodash';
import { ClickBroadcastService } from 'app/game-2d/utilities/click-handler/click-broadcast-service';
import { take } from 'rxjs/operators/take';

@Injectable()
export class GameEngine {
  private static instance: GameEngine;

  private FPS;
  private prevFrameTime = 0;
  private isLoading: boolean;
  private ctx: CanvasRenderingContext2D;
  private clickBroadcaster: ClickBroadcastService;

  settings: GameSettings;
  audio: HTMLAudioElement;
  muteBtn: MuteButton;
  pauseBtns: PauseMenuButton[];
  replayBtn: PauseMenuButton;
  txtMgr: TextManager;
  statsMgr: StatsManager;
  window: GameWindow;
  state: GameState;
  pauseKey = KeyCode.ESC;
  pausedText = 'PAUSED';
  readyText = 'PLAY';
  loadingText = 'LOADING';
  stage: GameStage;

  private constructor(fps?: number) {
    const canvas = <HTMLCanvasElement>document.getElementById('game_canvas');
    canvas.height = canvas.height || (canvas.width ? canvas.width * 0.5625 : document.documentElement.clientHeight);
    canvas.width = canvas.width || document.documentElement.clientWidth;
    canvas.addEventListener('click', this.onClick.bind(this));
    canvas.addEventListener('blur', this.pause.bind(this));
    canvas.addEventListener('keydown', this.togglePause.bind(this));

    this.clickBroadcaster = ClickBroadcastService.get();
    this.FPS = fps || 20;
    this.ctx = canvas.getContext('2d');
    this.window = GameWindow.get();
    this.settings = GameSettings.get();
    this.txtMgr = TextManager.get(this.ctx);
    this.statsMgr = StatsManager.get();

    this.audio = document.getElementById('game_audio_element') as HTMLAudioElement;
    this.audio.src = 'assets/audio/RoccoW_-_Nontinde_Vendor_Theme.mp3';
    this.audio.volume = 0.5;

    this.stage = new GameStageOne();

    this.pauseBtns = [
      new PauseMenuButton(0.5, 0.55, 0.3, 0.1, this.ctx, this.play.bind(this), 'RESUME'),
    ];

    this.replayBtn = new PauseMenuButton(0.5, 0.55, 0.3, 0.1, this.ctx, this.resetStage.bind(this), 'REPLAY');

    this.muteBtn = new MuteButton(0.9, 0.9, 0.1, 0.1, this.ctx);
    this.muteBtn.load();

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

      this.clear();
      this.update();
      this.prevFrameTime = time;
    }, 1000 / this.FPS);
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.window.width, this.window.height);
    this.ctx.save();
  }

  private update() {
    this.ctx.beginPath();

    this.stage.update(this.state);

    if (this.stage.player && this.stage.player.health <= 0) {
      this.state = GameState.LOST;
    }

    switch (this.state) {
      case GameState.READY:
        this.txtMgr.drawText(this.readyText, this.window.height * 0.4);
        break;
      case GameState.ACTIVE:
        this.muteBtn.update();
        this.audio.muted = this.settings.muted;
        break;
      case GameState.LOADING:
        this.txtMgr.drawText(this.loadingText, this.window.height * 0.4);
        break;
      case GameState.PAUSED:
        this.txtMgr.drawText(this.pausedText, this.window.height * 0.4);
        each(this.pauseBtns, (pb) => pb.update());
        break;
      case GameState.LOST:
        this.txtMgr.drawText('GAME OVER', this.window.height * 0.4);
        this.replayBtn.update();
        break;
    }

    const time = new Date(this.statsMgr.timer.time * 1000).toISOString().substr(14, 5);
    this.txtMgr.drawText(' ' + time, this.window.height * 0.99, null, 'left', 'white', 6);
    this.txtMgr.drawText('SCORE: ' + this.statsMgr.score + ' ', this.window.height * 0.065, null, 'right', 'white', 6);

    this.clickBroadcaster.clear();

    this.ctx.restore();
  }

  onClick(e: MouseEvent) {
    if (this.state === GameState.READY) {
      return this.play();
    } else {
      this.clickBroadcaster.add(e);
    }
  }

  async start() {
    this.gameLoop(0);

    this.state = GameState.LOADING;
    this.isLoading = true;

    await this.stage.load();

    this.state = GameState.READY;
    this.isLoading = false;
  }

  play() {
    this.statsMgr.timer.start(this.statsMgr.timer.time);
    this.state = GameState.ACTIVE;

    if (!this.settings.muted) {
      this.audio.play();
    }
  }

  pause() {
    this.state = GameState.PAUSED;

    if (!this.settings.muted) {
      this.audio.pause();
    }

    this.statsMgr.timer.stop();
    this.stage.pause();
  }

  togglePause(e: KeyboardEvent) {
    if (e.keyCode === this.pauseKey) {
      if (this.state === GameState.ACTIVE) {
        this.pause();
      } else if (this.state === GameState.PAUSED) {
        this.play();
      }
    }
  }

  setStage(stage: GameStage) {
    this.stage = stage;
    this.start();
  }

  resetStage() {
    this.state = GameState.LOADING;
    this.stage.reset();
    this.state = GameState.READY;
  }
}
