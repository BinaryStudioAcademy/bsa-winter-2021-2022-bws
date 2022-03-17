import { instance as InstanceRep } from '~/data/repositories/repositories';
import { ec2 as EC2Serv, instance as instanceServ } from '~/services/services';
import { ENV } from '~/common/enums/enums';
import {
  INSTANCE_AUTO_DELETE_INTERVAL,
  ONE_HOUR,
} from '~/common/constants/constants';
import { getSubHours } from '~/helpers/helpers';

type Constructor = {
  flags: typeof ENV.FLAGS;
  instanceService: typeof instanceServ;
  instanceRepository: typeof InstanceRep;
  ec2Service: typeof EC2Serv;
};

class BackgroundJob {
  #flags: typeof ENV.FLAGS;
  #instanceService: typeof instanceServ;
  #instanceRepository: typeof InstanceRep;
  #ec2Service: typeof EC2Serv;

  constructor({
    flags,
    instanceService,
    instanceRepository,
    ec2Service,
  }: Constructor) {
    this.#flags = flags;
    this.#instanceService = instanceService;
    this.#instanceRepository = instanceRepository;
    this.#ec2Service = ec2Service;
  }

  public async clearInstances(): Promise<void> {
    if (this.#flags.HAS_INSTANCE_AUTO_DELETING) {
      setInterval(async () => {
        const oldDate = getSubHours(ONE_HOUR).toISOString();

        const oldInstances = await this.#instanceRepository.getInstancesByDate(
          oldDate,
        );
        oldInstances.forEach((instance) => instanceServ.delete(instance.id));
      }, INSTANCE_AUTO_DELETE_INTERVAL);
    }
  }
}

export { BackgroundJob };
