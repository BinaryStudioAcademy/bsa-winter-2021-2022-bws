import { EAMMasterByIdResponseDto } from './eam-master-by-id-response-dto.type';

type EAMMasterSignInResponseDto = {
  user: EAMMasterByIdResponseDto;
  token: string;
};

export { type EAMMasterSignInResponseDto };
