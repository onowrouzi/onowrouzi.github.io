import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';

export class CollisionDetector {

  public static intersects(c1: CollisionBox, c2: CollisionBox) {
    return !(c1.left > c2.right ||
      c1.right < c2.left ||
      c1.top > c2.bottom ||
      c1.bottom < c2.top)
      ||
        (c1.left <= c2.left &&
          c1.right >= c2.right &&
          c1.top <= c2.top &&
          c1.bottom >= c2.bottom)
        ||
        (c2.left <= c1.left &&
          c2.right >= c1.right &&
          c2.top <= c1.top &&
          c2.bottom >= c1.bottom);
  }

}
