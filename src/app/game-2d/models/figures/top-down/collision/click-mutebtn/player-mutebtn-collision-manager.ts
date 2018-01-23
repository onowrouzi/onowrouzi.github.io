import { OnCollision } from 'app/game-2d/utilities/collision/on-collision';
import { MuteButton } from 'app/game-2d/models/figures/top-down/ui/mute-button';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';
import { ClickFigure } from 'app/game-2d/models/figures/click-figure';
import { GameSettings } from 'app/game-2d/utilities/settings/game-settings';

export class ClickMuteButtonCollisionManager implements OnCollision<ClickFigure, MuteButton> {
  onCollision(p: ClickFigure, mb: MuteButton) {
    if (CollisionDetector.intersects(p.getCollisionBox(), mb.getCollisionBox())) {
      const settings = GameSettings.get();
      settings.muted = !settings.muted;
    }
  }
}
