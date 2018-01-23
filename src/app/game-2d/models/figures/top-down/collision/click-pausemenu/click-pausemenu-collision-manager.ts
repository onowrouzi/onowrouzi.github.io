import { OnCollision } from 'app/game-2d/utilities/collision/on-collision';
import { ClickFigure } from 'app/game-2d/models/figures/click-figure';
import { PauseMenuButton } from 'app/game-2d/models/figures/top-down/ui/pause-menu-button';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';

export class ClickPauseMenuCollisionManager implements OnCollision<ClickFigure, PauseMenuButton> {
  onCollision(cf: ClickFigure, pmb: PauseMenuButton) {
    if (CollisionDetector.intersects(cf.getCollisionBox(), pmb.getCollisionBox())) {
      pmb.action();
    }
  }
}
