export class FakeStorage implements Storage {

  [index: number]: string;
  [key: string]: any;
  public length: number;

  public clear(): void {
    while (this.length > 0) {
      delete this[this.length - 1];
    }
  }

  public getItem(key: string): string {
    return this[key];
  }

  public key(index: number): string {
    return this.key[index];
  }

  public removeItem(key: string): void {
    delete this[key];
  }

  public setItem(key: string, data: string): void {
    this[key] = data;
  }
}
