import jwt, { Secret } from 'jsonwebtoken';
import { TokenPayload } from '~/common/types/types';
import { ENV } from '~/common/enums/app/env.enum';

class Token {
  public create = (data: TokenPayload): string => {
    return jwt.sign(data, <Secret>ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });
  };

  public decode = <T>(token: string): T => {
    return jwt.decode(token) as T;
  };
}

export { Token };
