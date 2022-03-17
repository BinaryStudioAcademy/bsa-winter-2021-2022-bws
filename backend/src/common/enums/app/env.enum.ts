import { config } from 'dotenv';
import { AppEnvironment } from '~/common/enums/app/app-environment.enum';

config({ path: '../.env/backend.env' });

const {
  NODE_ENV,
  PORT,
  HOST,
  FRONTEND_URL,
  SECRET_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_DIALECT,
  AWS_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_LAMBDA_ROLE,
  HAS_INSTANCE_AUTO_DELETING,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: Number(PORT),
    SERVER_HOST: HOST ?? 'http://localhost',
    FRONTEND_URL: FRONTEND_URL,
  },
  JWT: {
    SECRET: SECRET_KEY,
    EXPIRES_IN: '24h',
  },
  DB: {
    USER: DB_USER,
    PASSWORD: DB_PASSWORD,
    DATABASE: DB_DATABASE,
    HOST: DB_HOST,
    PORT: Number(DB_PORT),
    POOL_MIN: Number(DB_POOL_MIN),
    POOL_MAX: Number(DB_POOL_MAX),
    DIALECT: DB_DIALECT,
  },
  AWS: {
    REGION: AWS_REGION as string,
    ACCESS_KEY: AWS_ACCESS_KEY as string,
    SECRET_KEY: AWS_SECRET_KEY as string,
    LAMBDA_ROLE: AWS_LAMBDA_ROLE as string,
  },
  FLAGS: {
    HAS_INSTANCE_AUTO_DELETING: HAS_INSTANCE_AUTO_DELETING === 'true',
  },
  API: {
    V1_PREFIX: '/api/v1',
  },
} as const;

export { ENV };
