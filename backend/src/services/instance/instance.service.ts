import { instance as InstanceRep } from '~/data/repositories/repositories';
import {
  SCInstanceCreateRequestDto,
  SCInstanceCreateResponseDto,
  SCInstanceGetByTenantRequestParamsDto,
  SCInstanceGetByTenantResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { Instance as InstanceEntity } from './instance.entity';
import {
  keyPair as KeyPairServ,
  ec2 as EC2Serv,
  token as tokenServ,
  operationSystem as OperationSystemServ,
} from '~/services/services';
import {
  InstanceDefaultParam,
  UserRole,
  HttpCode,
  ExceptionMessage,
} from '~/common/enums/enums';
import { SCError } from '~/exceptions/exceptions';

type Constructor = {
  instanceRepository: typeof InstanceRep;
  operationSystemService: typeof OperationSystemServ;
  keyPairService: typeof KeyPairServ;
  ec2Service: typeof EC2Serv;
  tokenService: typeof tokenServ;
};

class Instance {
  #instanceRepository: typeof InstanceRep;
  #operationSystemService: typeof OperationSystemServ;
  #keyPairService: typeof KeyPairServ;
  #ec2Service: typeof EC2Serv;
  #tokenService: typeof tokenServ;

  constructor({
    instanceRepository,
    operationSystemService,
    keyPairService,
    ec2Service,
    tokenService,
  }: Constructor) {
    this.#instanceRepository = instanceRepository;
    this.#operationSystemService = operationSystemService;
    this.#keyPairService = keyPairService;
    this.#ec2Service = ec2Service;
    this.#tokenService = tokenService;
  }

  public async getByTenantId({
    requestParams,
    token,
  }: {
    requestParams: SCInstanceGetByTenantRequestParamsDto;
    token: string;
  }): Promise<SCInstanceGetByTenantResponseDto> {
    const { tenantId }: TokenPayload = await this.#tokenService.decode(token);
    const instances = await this.#instanceRepository.getByTenantId({
      filter: requestParams,
      tenantId,
    });

    return {
      items: instances.map(({ name, id, createdAt, hostname }) => ({
        name,
        instanceId: id,
        instanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
        createdAt,
        publicDNS: hostname,
      })),
    };
  }

  public async create({
    instanceCredentials,
    token,
  }: {
    instanceCredentials: SCInstanceCreateRequestDto;
    token: string;
  }): Promise<SCInstanceCreateResponseDto> {
    const { name, operationSystemId } = instanceCredentials;
    const { userId, userRole, tenantId }: TokenPayload =
      await this.#tokenService.decode(token);
    if (userRole !== UserRole.WORKER) {
      throw new SCError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_INSTANCE_CREATE,
      });
    }

    const keyPairId = await this.#keyPairService.create();
    const { hostname, instanceId } = await this.#ec2Service.createInstance({
      name,
      keyName: keyPairId,
      imageId: await this.#operationSystemService.getImageId(operationSystemId),
    });

    const instance = InstanceEntity.createNew({
      name,
      keyPairId,
      username: InstanceDefaultParam.USERNAME as string,
      hostname: hostname,
      operationSystemId,
      createdBy: userId,
      awsInstanceId: instanceId,
      tenantId,
    });

    await this.#instanceRepository.create(instance);

    return {
      instanceId: instance.id,
      instanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
      name: instance.name,
      createdAt: instance.createdAt,
      publicDNS: instance.hostname,
    };
  }

  public async delete(id: string): Promise<void> {
    const { awsInstanceId, keyPairId } =
      (await this.#instanceRepository.getById(id)) as InstanceEntity;
    await this.#ec2Service.deleteInstance(awsInstanceId);
    await this.#instanceRepository.delete(id);
    await this.#ec2Service.deleteKeyPair(keyPairId);
    await this.#keyPairService.delete(keyPairId);
  }
}

export { Instance };
