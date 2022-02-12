import { EAMMasterByIdResponseDto } from './eam-master-by-id-response-dto.type';

type EAMMasterSignUpResponseDto = {
  user: EAMMasterByIdResponseDto;
  token: string;
};

export { type EAMMasterSignUpResponseDto };
