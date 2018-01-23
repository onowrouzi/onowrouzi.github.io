import { GameFigure } from 'app/game-2d/models/figures/game-figure';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';
import { ClickFigure } from 'app/game-2d/models/figures/click-figure';
// tslint:disable-next-line:max-line-length
import { ClickPauseMenuCollisionManager } from 'app/game-2d/models/figures/top-down/collision/click-pausemenu/click-pausemenu-collision-manager';

export class PauseMenuButton extends GameFigure {

  text: string;
  fontHeight: number;
  fontFamily: string;
  align: string;
  color: string;
  backgroundColor: string;
  action: PauseMenuButtonAction;
  clickDetector: ClickPauseMenuCollisionManager;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, text: string,
              action?: PauseMenuButtonAction, fontFamily?: string, fontHeight?: number, color?: string,
              backgroundColor?: string, align?: string) {
    super(x, y, width, height, ctx);

    this.text = text;
    this.fontHeight = fontHeight;
    this.fontFamily = fontFamily;
    this.align = align || 'center';
    this.color = color || 'white';
    this.backgroundColor = backgroundColor || '#333';
    this.action = action;

    this.clickDetector = new ClickPauseMenuCollisionManager();
  }

  render() {
    const rect = this.getCollisionBox();
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top);
    this.ctx.strokeStyle = this.color;
    this.ctx.strokeRect(rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top);
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = this.align;
    this.ctx.fillText(this.text, this.window.width * this.x, this.window.height * this.y);
  }

  getCollisionBox() {
    this.ctx.font = this.getFontSize() + 'px ' +  (this.fontFamily || 'calibri');

    const metrics = this.ctx.measureText(this.text);
    const width = metrics.width > this.window.width * this.width ? this.window.width * this.width : metrics.width;
    return new CollisionBox(this.window.width * this.x - width,
                            this.window.width * this.x + width,
                            this.window.height * this.y - this.getFontSize(),
                            this.window.height * this.y + this.getFontSize() / 2);
  }

  detectCollision(c: ClickFigure) {
    this.clickDetector.onCollision(c, this);
  }

  private getFontSize() {
    return this.window.height * (this.fontHeight || (this.window.height * this.height / 5)) / 100;
  }
}

export type PauseMenuButtonAction = () => void;
