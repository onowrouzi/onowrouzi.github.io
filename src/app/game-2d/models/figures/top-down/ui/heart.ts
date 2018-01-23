import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { IObserver } from 'app/game-2d/models/observer/observer';
import { GameWindow } from 'app/game-2d/models/window/game-window';

export class Heart extends GameSprite implements IObserver<PlayerTopDownFigure> {

  count: number;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);

    this.sprites = this.loader.load(['assets/sprites/ui/heart.png'], this.width, this.height);
  }

  render() {
    for (let i = 0; i < this.count; i++) {
      this.ctx.drawImage(this.sprites[0], this.window.width * this.x + this.window.width * this.width * i, this.y,
                          this.window.width * this.width, this.window.height * this.height);
    }
  }

  onNotify(p: PlayerTopDownFigure): void {
    this.count = p.health;
  }

}