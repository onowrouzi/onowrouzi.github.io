export interface IObserver<T> {
  deleteObserver: boolean;

  onNotify(subject: T): void;
}
