export type ConfigType = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  jwt: JwtConfig;
};

export type AppConfig = {
  host: string;
  port: number;
};

export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};

export type JwtConfig = {
  accessTokenSecret: string;
  accessTokenExpire: number;
  refreshTokenSecret: string;
  refreshTokenExpire: number;
};
