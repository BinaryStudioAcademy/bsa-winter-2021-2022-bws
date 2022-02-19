import {
  instance as InstanceRep,
  operationSystem as OperationSystemRep,
} from '~/data/repositories/repositories';
import {
  SCInstanceCreateRequestDto,
  SCInstanceCreateResponseDto,
} from '~/common/types/types';
import { Instance as InstanceEntity } from './instance.entity';
import {
  keyPair as KeyPairServ,
  awsEc2 as AWSEc2Serv,
} from '~/services/services';

type Constructor = {
  instanceRepository: typeof InstanceRep;
  operationSystemRepository: typeof OperationSystemRep;
  keyPairService: typeof KeyPairServ;
  awsEc2Service: typeof AWSEc2Serv;
};

class Instance {
  #instanceRepository: typeof InstanceRep;
  #operationSystemRepository: typeof OperationSystemRep;
  #keyPairService: typeof KeyPairServ;
  #awsEc2Service: typeof AWSEc2Serv;

  constructor({
    instanceRepository,
    operationSystemRepository,
    keyPairService,
    awsEc2Service,
  }: Constructor) {
    this.#instanceRepository = instanceRepository;
    this.#operationSystemRepository = operationSystemRepository;
    this.#keyPairService = keyPairService;
    this.#awsEc2Service = awsEc2Service;
  }

  public async getImageId(operationSystemId: string): Promise<string> {
    const operationSystem = await this.#operationSystemRepository.getById(
      operationSystemId,
    );
    return operationSystem!.awsGenerationName;
  }

  public async create({
    name,
    operationSystemId,
    createdBy,
  }: SCInstanceCreateRequestDto): Promise<SCInstanceCreateResponseDto> {
    const keyPairsId = await this.#keyPairService.create();
    const awsInstanceData = await this.#awsEc2Service.createInstance({
      name,
      keyName: keyPairsId,
      imageId: await this.getImageId(operationSystemId),
    });

    const instanceData = InstanceEntity.createNew({
      name,
      keyPairsId,
      username: 'ec2-user',
      hostname: awsInstanceData.hostname as string,
      operationSystemId,
      createdBy,
      awsInstanceId: awsInstanceData.instanceId as string,
    });

    const {
      id,
      name: instanceName,
      createdAt,
      hostname,
    } = await this.#instanceRepository.create(instanceData);

    return {
      instanceId: id,
      instanceType: 'type',
      name: instanceName,
      createdAt,
      publicDNS: hostname,
    };
  }
}

export { Instance };
