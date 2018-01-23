export interface IObserver<T> {
  onNotify(subject: T): void;
}
