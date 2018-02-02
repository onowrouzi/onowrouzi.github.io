import { ResourceLoader } from 'app/game-2d/utilities/resource-loaders/resource-loader';

import { each } from 'lodash';
import { CollisionBox } from 'app/game-2d/utilities/collision/collision-box';
import { GameWindow } from 'app/game-2d/models/window/game-window';

export class SpritesLoader extends ResourceLoader {
  sprites: SpriteObject[];

  constructor() {
    super();
  }

  load(sources: string[], width: number, height: number) {
    return new Promise<SpriteObject[]>((res, rej) => {
      this.sprites = [];
      this.count = sources.length;

      each(sources, (src) => {
        const sprite = new SpriteObject();
        const img = new Image(width, height);
        img.src = src;
        img.width = width;
        img.height = height;
        img.onload = () => {
          sprite.cBox = this.getCollisionBox(img, width, height);
          if (--this.count === 0) {
            res(this.sprites);
          }
        };
        sprite.img = img;
        this.sprites.push(sprite);
      });
    });
  }

  getCollisionBox(img, w, h) {
    const win = GameWindow.get();
    let l = w;
    let t = h;
    let r = 0;
    let b = 0;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const buffer = new Uint32Array(ctx.getImageData(0, 0, w, h).data.buffer);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (buffer[Math.floor(x + y * w)] > 0 && x < l) {
          l = x;
        }
      }
    }

    for (let y = 0; y < h; y++) {
      for (let x = w; x >= 0; x--) {
        if (buffer[Math.floor(x + y * w)] > 0 && x > r) {
          r = x;
        }
      }
    }

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        if (buffer[Math.floor(x + y * w)] > 0 && y < t) {
          t = y;
        }
      }
    }

    for (let x = 0; x < w; x++) {
      for (let y = h; y >= 0; y--) {
        if (buffer[Math.floor(x + y * w)] > 0 && y > b) {
          b = y;
        }
      }
    }

    return new CollisionBox(l / win.width, r / win.width, t / win.height, b / win.height);
  }
}

export class SpriteObject {
  img: HTMLImageElement;
  cBox: CollisionBox;
}
