import { ClickableFigure, ClickAction } from 'app/game-2d/utilities/click-handler/clickable-figure';
import { TextManager } from 'app/game-2d/utilities/text-manager/text-manager';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';

export class DialogBox extends ClickableFigure {
  private txtMgr: TextManager;
  private txt: string;
  private color: string;
  private backgroundColor: string;
  private txtIdx: number;
  private show: boolean;
  private onStart: ClickAction;
  private onFinish: ClickAction;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, callback?: ClickAction,
              txt?: string, color?: string, backgroundColor?: string) {
    super(x, y, width, height, ctx, () => {
      if (this.txtIdx < this.txt.length) {
        this.skip();
      } else {
        this.show = false;
        this.txt = '';

        if (callback) {
          callback();
        }
      }
    });

    this.txtMgr = TextManager.get(ctx);
    this.txt = txt;
    this.color = color || 'white';
    this.backgroundColor = backgroundColor || '#333';
    this.txtIdx = 0;
  }

  update() {
    if (this.show && this.txt) {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, this.window.height * 0.7, this.window.width, this.window.height * 0.3);
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = this.color;
      this.ctx.strokeRect(0, this.window.height * 0.7, this.window.width, this.window.height * 0.3);
      this.ctx.lineWidth = 1;
      this.txtMgr.drawText(this.txt.substr(0, this.txtIdx), this.window.height * 0.8, 10, 'left', 'white', 8, '"Press Start 2P"');

      this.txtIdx = this.txtIdx < this.txt.length ? this.txtIdx + 1 : this.txtIdx;
    }
  }

  start(txt?: string) {
    if (txt) {
      this.txt = txt;
    }

    this.show = true;
    this.txtIdx = 0;

    if (this.onStart) {
      this.onStart();
    }
  }

  skip() {
    this.txtIdx = this.txt.length;
  }

  setText(txt: string) {
    this.txt = txt;
  }

  setOnStart(callback: ClickAction) {
    this.onStart = callback;
  }

  setOnFinish(callback: ClickAction) {
    this.action = () => {
      if (this.txtIdx < this.txt.length) {
        this.skip();
      } else {
        this.show = false;
        this.txt = '';

        callback();
      }
    };
  }

  getCollisionBox() {
    return new CollisionBox(0, this.window.width, 0, this.window.height);
  }
}
