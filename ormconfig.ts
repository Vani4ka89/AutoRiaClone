import * as path from 'node:path';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import getConfig from './src/configs/configuration';

config({ path: './environments/.env' });
const postgresService = getConfig().postgres;

export default new DataSource({
  type: 'postgres',
  host: postgresService.host,
  port: postgresService.port,
  username: postgresService.user,
  password: postgresService.password,
  database: postgresService.dbName,
  entities: [
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize: false,
});
