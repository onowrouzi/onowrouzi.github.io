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
    const lineHeight = this.window.height / 100 * (fontHeight || 24);
    this.ctx.fillStyle = color || 'white';
    this.ctx.font = lineHeight + 'px ' + (fontFamily || 'calibri');
    this.ctx.textAlign = align || 'center';
    const xPos = align === 'right' ? 1 : align === 'left' ? 0 : 0.5;
    x = x || (this.window.width * xPos);
    y = y || (this.window.height * 0.5);

    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = this.ctx.measureText(testLine);
      if (metrics.width > this.window.width && n > 0) {
        this.ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    this.ctx.fillText(line, x, y);
  }
}
