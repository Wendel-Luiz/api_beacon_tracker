import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from '../config/env.config';

export const typeOrmoptions = {
  type: 'postgres',
  host: config.db_host,
  port: config.db_port,
  username: config.db_username,
  password: config.db_password,
  database: config.db_database,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  cli: {
    migrationsDir: './src/migrations/',
  },
} as DataSourceOptions;

export const dataSource = new DataSource(typeOrmoptions);
