import { StaticSprite } from 'app/game-2d/models/figures/static-sprite';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';

export class DrinkVendingMachine extends StaticSprite {

  constructor (x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);

    this.sprites = this.loader.load(['assets/sprites/environment/Drinks Vending Machine.png'], this.width, this.height);
  }

  getCollisionBox() {
    return new CollisionBox(this.window.width * this.x + this.window.width * this.width / 5,
                            this.window.width * this.x + this.window.width * this.width * 4 / 5,
                            this.window.height * this.y, this.window.height * this.y + this.window.height * this.height / 2);
  }
}
