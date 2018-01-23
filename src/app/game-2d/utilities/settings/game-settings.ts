export class GameSettings {
  private static instance: GameSettings;

  muted: boolean;

  private constructor () {}

  public static get() {
    return this.instance = this.instance || new this();
  }
}
