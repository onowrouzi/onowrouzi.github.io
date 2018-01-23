import { GameFigure } from 'app/game-2d/models/figures/game-figure';

export interface OnCollision<T1, T2> {
  onCollision(f1: T1, f2: T2);
}
