import { hash, genSalt } from 'bcrypt';

type Constructor = {
  salt: number;
};

class Encrypt {
  #saltRounds: number;

  constructor({ salt }: Constructor) {
    this.#saltRounds = salt;
  }

  public createSalt = (): Promise<string> => {
    return genSalt(this.#saltRounds);
  };

  public createHash = (data: string, salt: string): Promise<string> => {
    return hash(data, salt);
  };

  public compare = async (
    data: string,
    salt: string,
    passwordHash: string,
  ): Promise<boolean> => {
    const hash = await this.createHash(data, salt);

    return hash === passwordHash;
  };
}

export { Encrypt };
