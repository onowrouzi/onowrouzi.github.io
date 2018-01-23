import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { GameSettings } from 'app/game-2d/utilities/settings/game-settings';
import { PlayerTopDownFigure } from 'app/game-2d/models/figures/top-down/player/player-figure';
import { ClickFigure } from 'app/game-2d/models/figures/click-figure';
// tslint:disable-next-line:max-line-length
import { ClickMuteButtonCollisionManager } from 'app/game-2d/models/figures/top-down/collision/click-mutebtn/player-mutebtn-collision-manager';
import { IObserver } from 'app/game-2d/models/observer/observer';

export class MuteButton extends GameSprite {
  settings: GameSettings;
  clickDetector: ClickMuteButtonCollisionManager;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    super(x, y, width, height, ctx);

    this.settings = GameSettings.get();
    this.clickDetector = new ClickMuteButtonCollisionManager();
  }

  load(callback?: (res: boolean) => boolean | void) {
    this.spritesList['muted'] = this.loader.load(['assets/sprites/ui/muted.png'], this.width, this.height, callback);
    this.spritesList['unmuted'] = this.loader.load(['assets/sprites/ui/unmuted.png'], this.width, this.height, callback);
  }

  render() {
    this.sprites = this.settings.muted ? this.spritesList['muted'] : this.spritesList['unmuted'];
    super.render();
  }

  detectCollision(c: ClickFigure) {
    this.clickDetector.onCollision(c, this);
  }
}
