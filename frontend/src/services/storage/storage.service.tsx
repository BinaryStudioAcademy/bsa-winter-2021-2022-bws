type Constructor = {
  storage: globalThis.Storage;
};

class Storage {
  #storage: globalThis.Storage;

  constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  getItem(key: string): string | null {
    return this.#storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.#storage.setItem(key, value);
  }
}

export { Storage };
