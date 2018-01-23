import { ResourceLoader, ResourceLoaderCallback } from 'app/game-2d/utilities/resource-loaders/resource-loader';

import { each } from 'lodash';

export class SpritesLoader extends ResourceLoader {
  sprites: HTMLImageElement[];

  constructor() {
    super();
  }

  load(sources: string[], width?: number, height?: number, isLoaded?: ResourceLoaderCallback) {
    this.sprites = [];
    this.count = sources.length;

    each(sources, (src) => {
      const img = new Image(width, height);
      img.src = src;
      img.onload = isLoaded ? () => isLoaded(--this.count === 0) : null;
      this.sprites.push(img);
    });

    return this.sprites;
  }
}
