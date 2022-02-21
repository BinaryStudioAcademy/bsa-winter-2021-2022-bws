import { EAMWorkerByIdResponseDto } from './eam-worker-by-id-response-dto.type';

type EAMWorkerSignInResponseDto = {
  user: EAMWorkerByIdResponseDto;
  token: string;
};

export { type EAMWorkerSignInResponseDto };
