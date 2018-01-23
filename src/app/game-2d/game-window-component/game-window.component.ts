import { Component, OnInit, Input } from '@angular/core';

import { GameEngine } from 'app/game-2d/engine/game-engine';
import { GameWindow } from 'app/game-2d/models/window/game-window';
import { GameState } from 'app/game-2d/engine/game-state';

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.scss']
})
export class GameWindowComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  game: GameEngine;
  window: GameWindow;
  canvas: HTMLCanvasElement;
  focus: boolean;
  fsElement: string;
  fsReqMethod: string;
  fsEvent: string;

  constructor() {
    this.focus = false;
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('game_canvas');
    this.canvas.addEventListener('dblclick', this.setFullScreen.bind(this));
    document.addEventListener('click', this.setFocus.bind(this));
    window.addEventListener('blur', this.setFocus.bind(this));

    setTimeout(() => {
      this.window = GameWindow.get();
      this.game = GameEngine.get();
      this.setFullScreenParams();
    }, 1000);
  }

  setFocus(e) {
    if (this.game) {
      if (e.target === this.canvas) {
        if (this.game.state === GameState.READY) { // || this.game.state === GameState.PAUSED) {
          this.focus = true;
          this.game.play();
        }
      } else if (this.game.state !== GameState.READY) {
        this.focus = false;
        this.game.pause();
      }
    }
  }

  setFullScreen() {
    if (this.fsReqMethod) {
      this.canvas[this.fsReqMethod]();
      setTimeout(() => {
        if (document[this.fsElement] && !document[this.fsElement][this.fsEvent]) {
          document[this.fsElement][this.fsEvent] = this.onFullScreenChange.bind(this);
          this.onFullScreenChange();
        }
      }, 500);
    }
  }

  onFullScreenChange() {
    setTimeout(() => {
      if (document[this.fsElement]) {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.window.setDimensions(document.documentElement.clientWidth, document.documentElement.clientHeight);
      } else {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.window.setDimensions(this.width, this.height);
      }
    }, 100);
  }

  setFullScreenParams() {
    if (this.canvas.requestFullscreen) {
      this.fsElement = 'fullscreenElement';
      this.fsEvent = 'onfullscreenchange';
      this.fsReqMethod = 'requestFullscreen';
    }

    if (this.canvas.webkitRequestFullScreen) {
      this.fsElement = 'webkitFullscreenElement';
      this.fsEvent = 'onwebkitfullscreenchange';
      this.fsReqMethod = 'webkitRequestFullScreen';
    }

    // if (this.canvas.mozRequestFullScreen) {
    //   this.fsElement = 'mozFullScreenElement';
    //   this.fsEvent = 'onmozfullscreenchange';
    //   this.fsReqMethod = 'mozRequestFullScreen';
    // }

    // if (this.canvas.msRequestFullscreen) {
    //   this.fsElement = 'msFullscreenElement';
    //   this.fsEvent = 'onmsfullscreenchange';
    //   this.fsReqMethod = 'msRequestFullscreen';
    // }
  }
}
