import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { PlayerPotionCollisionManager } from 'app/game-2d/models/figures/top-down/collision/player-potion/player-potion-collision-manager';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';

export class Potion extends GameSprite {

  playerCollisionManager: PlayerPotionCollisionManager;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);

    this.playerCollisionManager = new PlayerPotionCollisionManager();

    this.sprites = this.loader.load(['assets/sprites/environment/potion.png'], this.width, this.height);
  }

  detectCollision(p: PlayerTopDownFigure) {
    this.playerCollisionManager.onCollision(p, this);
  }

}
