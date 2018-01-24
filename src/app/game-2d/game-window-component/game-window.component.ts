import { Component, OnInit, Input } from '@angular/core';

import { GameEngine } from 'app/game-2d/engine/game-engine';

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.scss']
})
export class GameWindowComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  game: GameEngine;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.game = GameEngine.get();
    }, 1000);
  }
}
