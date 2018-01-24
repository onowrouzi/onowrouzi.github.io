import { IObserver } from 'app/game-2d/models/observer/observer';

export interface IObservable {
  addObserver(observer: IObserver<any>);
  removeObserver(observer?: IObserver<any>);
  notifyObservers();
}
