import { GameFigure } from 'app/game-2d/models/figures/game-figure';

export interface OnCollision<T> {
  onCollision(f: T);
}
