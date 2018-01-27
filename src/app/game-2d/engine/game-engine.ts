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

@Injectable()
export class GameEngine {
  private static instance: GameEngine;

  private FPS;
  private prevFrameTime = 0;
  private isLoading: boolean;
  private ctx: CanvasRenderingContext2D;

  settings: GameSettings;
  audio: HTMLAudioElement;
  muteBtn: MuteButton;
  pauseBtns: PauseMenuButton[];
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
    this.txtMgr = TextManager.get(this.ctx);
    this.statsMgr = StatsManager.get();

    this.audio = document.getElementById('game_audio_element') as HTMLAudioElement;
    this.audio.src = 'assets/audio/RoccoW_-_Nontinde_Vendor_Theme.mp3';
    this.audio.volume = 0.5;

    this.stage = new GameStageOne();

    this.pauseBtns = [
      new PauseMenuButton(0.5, 0.5, 0.3, 0.1, this.ctx, this.play.bind(this), 'RESUME'),
    ];

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
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.window.width, this.window.height);
    this.ctx.save();
  }

  private update() {
    this.ctx.beginPath();

    switch (this.state) {
      case GameState.READY:
        this.stage.update(true);
        this.txtMgr.drawText(this.readyText, this.window.height * 0.3);
        break;
      case GameState.ACTIVE:
        this.stage.update();
        break;
      case GameState.LOADING:
        this.txtMgr.drawText(this.loadingText, this.window.height * 0.3);
        break;
      case GameState.PAUSED:
        this.stage.update(true);
        this.txtMgr.drawText(this.pausedText, this.window.height * 0.3);
        each(this.pauseBtns, (pb) => pb.render());
        break;
    }

    const time = new Date(this.statsMgr.timer.time * 1000).toISOString().substr(14, 5);
    this.txtMgr.drawText(' ' + time, this.window.height * 0.99, null, 'left', 'white', 6);
    this.txtMgr.drawText('SCORE: ' + this.statsMgr.score + ' ', this.window.height * 0.065, null, 'right', 'white', 6);
    this.muteBtn.render();

    this.ctx.restore();
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
    }

    this.stage.onClick(e);
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
    this.statsMgr.timer.start(this.state === GameState.READY ? 0 : this.statsMgr.timer.time);
    this.state = GameState.ACTIVE;

    if (!this.settings.muted) {
      this.audio.play();
    }

    this.gameLoop(0);
  }

  pause() {
    this.state = GameState.PAUSED;

    if (!this.settings.muted) {
      this.audio.pause();
    }

    this.statsMgr.timer.stop();
    this.stage.pause();
  }

  setStage(stage: GameStage) {
    this.stage = stage;
    this.start();
  }
}
