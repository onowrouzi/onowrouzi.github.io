import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';
// tslint:disable-next-line:max-line-length
import { ClickFigure } from 'app/game-2d/utilities/click-handler/click-figure';
import { ClickAction, ClickableFigure } from 'app/game-2d/utilities/click-handler/clickable-figure';

export class PauseMenuButton extends ClickableFigure {

  text: string;
  fontFamily: string;
  align: string;
  color: string;
  backgroundColor: string;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, action: ClickAction,
              text: string, fontFamily?: string, color?: string, backgroundColor?: string, align?: string) {
    super(x, y, width, height, ctx, action);

    this.text = text;
    this.fontFamily = fontFamily;
    this.align = align || 'center';
    this.color = color || 'white';
    this.backgroundColor = backgroundColor || '#333';
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
    this.ctx.font = this.window.height * this.height + 'px ' +  (this.fontFamily || 'calibri');

    const metrics = this.ctx.measureText(this.text);
    const width = metrics.width > this.window.width * this.width ? this.window.width * this.width : metrics.width;
    return new CollisionBox(this.window.width * this.x - width,
                            this.window.width * this.x + width,
                            this.window.height * this.y - this.window.height * this.height,
                            this.window.height * this.y + this.window.height * this.height / 2);
  }
}
