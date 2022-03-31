import { keyPair as KeyPairRep } from '~/data/repositories/repositories';
import { KeyPair as KeyPairEntity } from '../key-pair/key-pair.entity';
import { ec2 as EC2Serv } from '~/services/services';
import { getRandomId } from '~/helpers/helpers';
import { SCError } from '~/exceptions/exceptions';
import { HttpCode, ExceptionMessage } from '~/common/enums/enums';
import { SCSshKeyGetByIdResponseDto } from '~/common/types/types';

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

  public async getSshKeyById(id: string): Promise<SCSshKeyGetByIdResponseDto> {
    const keyPairData = await this.#keyPairRepository.getById(id);
    if (!keyPairData) {
      throw new SCError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.KEY_PAIR_NOT_FOUND,
      });
    }

    return {
      id: keyPairData.id,
      sshKey: keyPairData.sshPemFileContent,
    };
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
