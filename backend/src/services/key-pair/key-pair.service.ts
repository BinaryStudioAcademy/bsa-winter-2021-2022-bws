import { keyPair as KeyPairRep } from '~/data/repositories/repositories';
import { KeyPair as KeyPairEntity } from '../key-pair/key-pair.entity';
import { ec2 as EC2Serv } from '~/services/services';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  keyPairRepository: typeof KeyPairRep;
  ec2Service: typeof EC2Serv;
};

class KeyPair {
  #keyPairRepository: typeof KeyPairRep;
  #ec2Service: typeof EC2Serv;

  constructor({ keyPairRepository, ec2Service }: Constructor) {
    this.#keyPairRepository = keyPairRepository;
    this.#ec2Service = ec2Service;
  }

  public async create(): Promise<string> {
    const name = getRandomId();
    const keyPairData = await this.#ec2Service.createKeyPair(name);
    const keyPair = KeyPairEntity.createNew({
      id: keyPairData.name as string,
      sshPemFileContent: keyPairData.keyMaterial as string,
    });
    const { id } = await this.#keyPairRepository.create(keyPair);

    return id;
  }

  public async delete(id: string): Promise<void> {
    await this.#keyPairRepository.delete(id);
  }
}

export { KeyPair };
