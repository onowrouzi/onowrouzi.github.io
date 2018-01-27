import { ResourceLoader } from 'app/game-2d/utilities/resource-loaders/resource-loader';

import { each } from 'lodash';

export class SpritesLoader extends ResourceLoader {
  sprites: HTMLImageElement[];

  constructor() {
    super();
  }

  load(sources: string[], width?: number, height?: number) {
    return new Promise<HTMLImageElement[]>((res, rej) => {
      this.sprites = [];
      this.count = sources.length;

      each(sources, (src) => {
        const img = new Image(width, height);
        img.src = src;
        img.onload = () => {
          if (--this.count === 0) {
            res(this.sprites);
          }
        };
        this.sprites.push(img);
      });
    });
  }
}
