import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameWindowComponent } from './game-window-component/game-window.component';
import { GameEngine } from './engine/game-engine';
import { GameFigureManager } from 'app/game-2d/models/figures/game-figure-manager';
import { GameSettings } from 'app/game-2d/utilities/settings/game-settings';
import { GameKeyHandler } from 'app/game-2d/utilities/key-handler/key-handler';
import { GameWindow } from 'app/game-2d/models/window/game-window';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GameWindowComponent
  ],
  exports: [
    GameWindowComponent
  ]
})
export class Game2dModule { }

@Injectable()
export class Game {
  engine: GameEngine;
  window: GameWindow;
  figureManager: GameFigureManager;
  settingsManager: GameSettings;
  keyHandler: GameKeyHandler;

  constructor() {
    this.engine = GameEngine.get();
    this.window = GameWindow.get();
    this.figureManager = GameFigureManager.get();
    this.settingsManager = GameSettings.get();
    this.keyHandler = GameKeyHandler.get();
  }
}

