export class GameWindow {
  private static _instance: GameWindow;
  private readonly oWidth: number;
  private readonly oHeight: number;

  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  fsReqMethod: string;
  fsElement: string;
  fsEvent: string;

  private constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('game_canvas');
    this.oWidth = this.width = this.canvas.width;
    this.oHeight = this.height = this.canvas.height;

    this.canvas.addEventListener('dblclick', this.setFullScreen.bind(this));
    this.setFullScreenParams();
  }

  public static get() {
    return this._instance = this._instance || new this();
  }

  public setDimensions(width: number, height: number) {
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
  }

  setFullScreen() {
    if (this.fsReqMethod) {
      this.canvas[this.fsReqMethod]();
      setTimeout(() => {
        if (document[this.fsElement] && !document[this.fsElement][this.fsEvent]) {
          document[this.fsElement][this.fsEvent] = this.onFullScreenChange.bind(this);
          this.onFullScreenChange();
        }
      }, 500);
    }
  }

  onFullScreenChange() {
    setTimeout(() => {
      if (document[this.fsElement]) {
        this.setDimensions(document.documentElement.clientWidth, document.documentElement.clientHeight);
      } else {
        this.setDimensions(this.oWidth, this.oHeight);
      }
    }, 100);
  }

  setFullScreenParams() {
    if (this.canvas.requestFullscreen) {
      this.fsElement = 'fullscreenElement';
      this.fsEvent = 'onfullscreenchange';
      this.fsReqMethod = 'requestFullscreen';
    }

    if (this.canvas.webkitRequestFullScreen) {
      this.fsElement = 'webkitFullscreenElement';
      this.fsEvent = 'onwebkitfullscreenchange';
      this.fsReqMethod = 'webkitRequestFullScreen';
    }

    // if (this.canvas.mozRequestFullScreen) {
    //   this.fsElement = 'mozFullScreenElement';
    //   this.fsEvent = 'onmozfullscreenchange';
    //   this.fsReqMethod = 'mozRequestFullScreen';
    // }

    // if (this.canvas.msRequestFullscreen) {
    //   this.fsElement = 'msFullscreenElement';
    //   this.fsEvent = 'onmsfullscreenchange';
    //   this.fsReqMethod = 'msRequestFullscreen';
    // }
  }
}
