import { EAMMasterByIdResponseDto } from './master-by-id-response-dto.type';

type EAMMasterSignUpResponseDto = {
  user: EAMMasterByIdResponseDto;
  token: string;
};

export { type EAMMasterSignUpResponseDto };
