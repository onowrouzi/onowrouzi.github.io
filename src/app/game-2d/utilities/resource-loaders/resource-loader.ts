export abstract class ResourceLoader {
  count: number;

  constructor() {}

  abstract load(src: string[], width?: number, height?: number);
}
