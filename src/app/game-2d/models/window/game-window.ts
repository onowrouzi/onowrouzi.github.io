export class GameWindow {
  private static _instance: GameWindow;
  private readonly widthRatio: number;
  private readonly heightRatio: number;

  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  fsReqMethod: string;
  fsElement: string;
  fsEvent: string;

  private constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('game_canvas');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.widthRatio = this.width / document.documentElement.clientWidth;
    this.heightRatio = this.height / document.documentElement.clientHeight;

    window.addEventListener('resize', this.calcResize.bind(this));
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
      this.calcResize();
    }, 100);
  }

  calcResize() {
    this.setDimensions(document.documentElement.clientWidth * this.widthRatio,
                        document.documentElement.clientHeight * this.heightRatio);
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
