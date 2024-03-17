import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigType, PostgresConfig } from '../../configs/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigType>) => {
        const postgresService = configService.get<PostgresConfig>('postgres');
        return {
          type: 'postgres',
          host: postgresService.host,
          port: postgresService.port,
          username: postgresService.user,
          password: postgresService.password,
          database: postgresService.dbName,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'entities',
              '*.entity.js',
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'migrations',
              '*.js',
            ),
          ],
          synchronize: false,
          // migrationsRun: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
