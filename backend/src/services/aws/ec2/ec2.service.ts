import {
  EC2Client,
  RunInstancesCommand,
  CreateKeyPairCommand,
  CreateTagsCommand,
  DescribeInstancesCommand,
  waitUntilInstanceRunning,
  Reservation,
  Instance,
  DeleteKeyPairCommand,
  TerminateInstancesCommand,
} from '@aws-sdk/client-ec2';
import { InstanceDefaultParam } from '~/common/enums/enums';

type Constructor = {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

class EC2 {
  #ec2Client: EC2Client;

  constructor({ region, credentials }: Constructor) {
    this.#ec2Client = new EC2Client({
      region,
      credentials,
    });
  }

  public async createKeyPair(name: string): Promise<{
    name: string;
    keyMaterial: string;
  }> {
    const key = await this.#ec2Client.send(
      new CreateKeyPairCommand({ KeyName: name }),
    );

    return {
      name: key.KeyName as string,
      keyMaterial: key.KeyMaterial as string,
    };
  }

  public async deleteKeyPair(name: string): Promise<void> {
    await this.#ec2Client.send(new DeleteKeyPairCommand({ KeyName: name }));
  }

  public async setInstanceName(
    instanceId: string,
    name: string,
  ): Promise<void> {
    await this.#ec2Client.send(
      new CreateTagsCommand({
        Resources: [instanceId],
        Tags: [
          {
            Key: 'Name',
            Value: name,
          },
        ],
      }),
    );
  }

  public async createInstance({
    name,
    keyName,
    imageId,
  }: {
    name: string;
    keyName: string;
    imageId: string;
  }): Promise<{
    hostname: string;
    instanceId: string;
  }> {
    const data = await this.#ec2Client.send(
      new RunInstancesCommand({
        ImageId: imageId,
        InstanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
        MinCount: 1,
        MaxCount: 1,
        KeyName: keyName,
      }),
    );

    const [instance] = data.Instances as Instance[];
    const { InstanceId: instanceId } = instance;

    await this.setInstanceName(instanceId as string, name);

    await waitUntilInstanceRunning(
      {
        client: this.#ec2Client,
        maxWaitTime: InstanceDefaultParam.MAX_WAITING_TIME as number,
      },
      {
        InstanceIds: [instanceId as string],
      },
    );

    const dataWithPublicIpAddress = await this.#ec2Client.send(
      new DescribeInstancesCommand({ InstanceIds: [instanceId as string] }),
    );

    const [reservation] = dataWithPublicIpAddress.Reservations as Reservation[];
    const [instanceIpAddress] = reservation.Instances as Instance[];
    const { PublicIpAddress: publicIpAddress } = instanceIpAddress;

    return {
      instanceId: instanceId as string,
      hostname: publicIpAddress as string,
    };
  }

  public async deleteInstance(instanceId: string): Promise<void> {
    await this.#ec2Client.send(
      new TerminateInstancesCommand({ InstanceIds: [instanceId] }),
    );
  }
}

export { EC2 };
