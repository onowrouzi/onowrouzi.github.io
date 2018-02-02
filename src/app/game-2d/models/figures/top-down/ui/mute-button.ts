import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { GameSettings } from 'app/game-2d/utilities/settings/game-settings';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { ClickFigure } from 'app/game-2d/utilities/click-handler/click-figure';
import { OnGameClick } from 'app/game-2d/utilities/click-handler/on-game-click';
import { ClickableFigure } from 'app/game-2d/utilities/click-handler/clickable-figure';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';

export class MuteButton extends ClickableFigure {
  settings: GameSettings;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx, () => this.settings.muted = !this.settings.muted);

    this.settings = GameSettings.get();
  }

  async load() {
    this.spritesList['muted'] = await this.loader.load(['assets/sprites/ui/muted.png'], this.getWidth(), this.getHeight());
    this.spritesList['unmuted'] = await this.loader.load(['assets/sprites/ui/unmuted.png'], this.getWidth(), this.getHeight());
  }

  render() {
    this.sprites = this.settings.muted ? this.spritesList['muted'] : this.spritesList['unmuted'];
    super.render();
  }

  getCollisionBox() {
    return new CollisionBox(this.getX(), this.getX() + this.getWidth(), this.getY(), this.getY() + this.getHeight());
  }
}
