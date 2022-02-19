import { KeyPair as KeyPairM } from '~/data/models/models';
import { KeyPair as KeyPairEntity } from '~/services/key-pair/key-pair.entity';

type Constructor = {
  KeyPairModel: typeof KeyPairM;
};

class KeyPair {
  #KeyPairModel: typeof KeyPairM;

  constructor({ KeyPairModel }: Constructor) {
    this.#KeyPairModel = KeyPairModel;
  }

  async getById(id: string): Promise<KeyPairEntity | null> {
    const keyPair = await this.#KeyPairModel
      .query()
      .select()
      .where({ id })
      .first();

    if (!keyPair) {
      return null;
    }

    return KeyPair.modelToEntity(keyPair);
  }

  async create(keyPair: KeyPairEntity): Promise<KeyPairM> {
    const { id, sshPemFileContent, createdAt } = keyPair;
    return this.#KeyPairModel.query().insert({
      id,
      sshPemFileContent,
      createdAt,
    });
  }

  public static modelToEntity(model: KeyPairM): KeyPairEntity {
    const { id, sshPemFileContent, createdAt } = model;

    return KeyPairEntity.initialize({
      id,
      sshPemFileContent,
      createdAt,
    });
  }
}

export { KeyPair };
