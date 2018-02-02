import { GameSprite } from 'app/game-2d/models/figures/game-sprite';
import { OnGameClick } from 'app/game-2d/utilities/click-handler/on-game-click';
import { ClickFigure } from 'app/game-2d/utilities/click-handler/click-figure';
import { CollisionDetector } from 'app/game-2d/utilities/collision/collision-detector';
import { ClickBroadcastService } from 'app/game-2d/utilities/click-handler/click-broadcast-service';

import { each } from 'lodash';

export abstract class ClickableFigure extends GameSprite implements OnGameClick {
  clickBroadcaster: ClickBroadcastService;
  action: ClickAction;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, action: ClickAction, z?: number) {
    super(x, y, width, height, ctx, null, z || 10);

    this.action = action;
    this.clickBroadcaster = ClickBroadcastService.get();
  }

  update() {
    each(this.clickBroadcaster.getClicks(), (e: MouseEvent) => this.onClick(e));
    super.update();
  }

  onClick(e: MouseEvent) {
    if (!e) {
      console.error('onClick requires a click event: MouseEvent');
    }

    const r = this.ctx.canvas.getBoundingClientRect();
    const cf = new ClickFigure(e.clientX - r.left, e.clientY - r.top, 0.01, 0.01, this.ctx);
    if (CollisionDetector.intersects(cf.getCollisionBox(), this.getCollisionBox())) {
      this.action();
    }
  }
}

export type ClickAction = () => void | any;
