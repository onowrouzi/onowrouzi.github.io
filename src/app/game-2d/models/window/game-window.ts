export class GameWindow {
  private static _instance: GameWindow;
  width: number;
  height: number;

  private constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public static get() {
    const canvas = <HTMLCanvasElement>document.getElementById('game_canvas');
    return this._instance = this._instance || new this(canvas.clientWidth, canvas.clientHeight);
  }

  public setDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}
