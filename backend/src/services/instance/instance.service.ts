import { instance as InstanceRep } from '~/data/repositories/repositories';
import {
  SCInstanceCreateRequestDto,
  SCInstanceCreateResponseDto,
  SCInstanceGetByTenantRequestParamsDto,
  SCInstanceGetByTenantResponseDto,
  SCInstanceUpdateResponseDto,
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
  HttpCode,
  ExceptionMessage,
  InstanceState,
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
    const countItems = await this.#instanceRepository.getCount(tenantId);

    return {
      items: instances.map(
        ({
          name,
          id,
          awsInstanceId,
          createdAt,
          hostname,
          keyPairId,
          state,
          operationSystem,
        }) => ({
          name,
          id,
          awsInstanceId,
          instanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
          createdAt,
          publicIpAddress: hostname,
          keyPairId,
          state,
          operationSystem,
        }),
      ),
      countItems,
    };
  }

  public async create({
    instanceCredentials,
    token,
  }: {
    instanceCredentials: SCInstanceCreateRequestDto;
    token: string;
  }): Promise<SCInstanceCreateResponseDto> {
    const { name, operationSystemId, userData } = instanceCredentials;
    const { userId, tenantId }: TokenPayload = await this.#tokenService.decode(
      token,
    );

    const keyPairId = await this.#keyPairService.create();
    const operationSystem =
      await this.#operationSystemService.getOperationSystem(operationSystemId);
    const { instanceId: awsInstanceId } = await this.#ec2Service.createInstance(
      {
        name,
        keyName: keyPairId,
        imageId: operationSystem.awsGenerationName,
        userData: userData
          ? Buffer.from(userData).toString('base64')
          : userData,
      },
    );

    const instance = InstanceEntity.createNew({
      name,
      keyPairId,
      username: InstanceDefaultParam.USERNAME as string,
      operationSystemId,
      createdBy: userId,
      awsInstanceId,
      tenantId,
      operationSystem: {
        id: operationSystem.id,
        name: operationSystem.name,
      },
    });

    let id;

    try {
      const { id: instanceId } = await this.#instanceRepository.create(
        instance,
      );
      id = instanceId;
    } catch {
      await this.#ec2Service.deleteInstance(awsInstanceId);
      await this.#ec2Service.deleteKeyPair(keyPairId);
      await this.#keyPairService.delete(keyPairId);
      throw new SCError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.FAILED_TO_CREATE,
      });
    }

    (async (): Promise<void> => {
      try {
        await this.#ec2Service.waitUntilRunning(awsInstanceId);
      } catch {
        return;
      }

      await this.update(id as string, {
        hostname: await this.#ec2Service.getPublicIpAddress(awsInstanceId),
        state: InstanceState.ACTIVE,
      });
    })();

    return {
      id: instance.id,
      awsInstanceId: instance.awsInstanceId,
      instanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
      name: instance.name,
      createdAt: instance.createdAt,
      publicIpAddress: null,
      state: instance.state,
      keyPairId: instance.keyPairId,
      operationSystem: {
        id: operationSystem.id,
        name: operationSystem.name,
      },
    };
  }

  public async update(
    id: string,
    data: {
      name?: string;
      state?: InstanceState;
      hostname?: string;
    },
  ): Promise<SCInstanceUpdateResponseDto> {
    const instance = await this.#instanceRepository.getById(id);
    if (!instance) {
      throw new SCError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.INSTANCE_NOT_FOUND,
      });
    }

    const { name, state, hostname } = data;

    if (!Object.keys(data).length || name === instance.name) {
      throw new SCError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.NOTHING_TO_UPDATE,
      });
    }

    if (name) {
      const { awsInstanceId } = (await this.#instanceRepository.getById(
        id,
      )) as InstanceEntity;
      await this.#ec2Service.setInstanceName(awsInstanceId, name as string);
    }

    const updateInstance = {
      ...instance,
      name: name ? name : instance.name,
      state: state ? state : instance.state,
      hostname: hostname ? hostname : instance.hostname,
    };

    await this.#instanceRepository.updateById(updateInstance);
    return {
      id: updateInstance.id,
      awsInstanceId: updateInstance.awsInstanceId,
      instanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
      name: updateInstance.name,
      createdAt: updateInstance.createdAt,
      publicIpAddress: updateInstance.hostname,
      state: updateInstance.state,
      keyPairId: updateInstance.keyPairId,
      operationSystem: updateInstance.operationSystem,
    };
  }

  public async delete(id: string): Promise<void> {
    const instance = await this.#instanceRepository.getById(id);
    if (!instance) {
      throw new SCError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.INSTANCE_NOT_FOUND,
      });
    }
    const { awsInstanceId, keyPairId } = instance;
    await this.#ec2Service.deleteInstance(awsInstanceId);
    await this.#instanceRepository.delete(id);
    await this.#ec2Service.deleteKeyPair(keyPairId);
    await this.#keyPairService.delete(keyPairId);
  }
}

export { Instance };
