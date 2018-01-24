import { GameWindow } from 'app/game-2d/models/window/game-window';

export class TextManager {
  private static instance: TextManager;

  private ctx: CanvasRenderingContext2D;
  private window: GameWindow;

  private constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.window = GameWindow.get();
  }

  public static get(ctx: CanvasRenderingContext2D) {
    return this.instance = this.instance || new this(ctx);
  }

  drawText(text: string, y: number, x?: number, align?: string, color?: string, fontHeight?: number, fontFamily?: string) {
    this.ctx.fillStyle = color || 'white';
    this.ctx.font = this.window.height / 100 * (fontHeight || 24) + 'px ' + (fontFamily || 'calibri');
    this.ctx.textAlign = align || 'center';
    const xPos = align === 'right' ? 1 : align === 'left' ? 0 : 0.5;
    this.ctx.fillText(text, x || (this.window.width * xPos), y || (this.window.height * 0.5));
  }
}
