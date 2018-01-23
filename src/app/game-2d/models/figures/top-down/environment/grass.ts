import { GameWindow } from 'app/game-2d/models/window/game-window';
import { GridTile } from 'app/game-2d/models/figures/top-down/environment/grid-tile';
import { ResourceLoaderCallback } from 'app/game-2d/utilities/resource-loaders/resource-loader';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { PlayerGrassCollisionManager } from 'app/game-2d/models/figures/top-down/collision/player-grass/player-grass-collision-manager';

export class GrassTile extends GridTile {
  playerCollisionManager: PlayerGrassCollisionManager;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);
  }

  load(callback?: ResourceLoaderCallback) {
    this.sprites = this.loader.load(['assets/sprites/environment/grass-tile.png'],
                    this.window.width * this.width,
                    this.window.height * this.height,
                    callback);
    this.playerCollisionManager = new PlayerGrassCollisionManager();
  }

  render() {
    for (let x = 0; x < this.window.width; x += this.window.width * this.width) {
      for (let y = 0; y < this.window.height; y += this.window.height * this.height) {
        this.ctx.drawImage(this.sprites[0], x, y, this.window.width * this.width, this.window.height * this.height);
      }
    }
  }

  detectCollision(p: PlayerTopDownFigure) {
    this.playerCollisionManager.onCollision(p, this);
  }
}
