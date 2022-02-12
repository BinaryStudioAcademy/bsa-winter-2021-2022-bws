import { EAMMasterByIdResponseDto } from './master-by-id-response-dto.type';

type EAMMasterSignInResponseDto = {
  user: EAMMasterByIdResponseDto;
  token: string;
};

export { type EAMMasterSignInResponseDto };
