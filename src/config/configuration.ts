import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

const entity = [];

export default (): AppConfig => ({
  apiOptions: {
    host: process.env.API_HOST || 'localhost',
    port: Number(process.env.API_PORT) || 3000,
  },
  database: {
    type: (process.env.DB_TYPE as any) || 'postgres',
    synchronize: true,
    logging: false,
    url: process.env.DB_URL,
    entities: entity,
    migrations: [join(__dirname, '../../migrations/*.ts')],
    // ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
});

export interface AppConfig {
  database: DataSourceOptions;
  apiOptions: {
    host: string;
    port: number;
  };
}
