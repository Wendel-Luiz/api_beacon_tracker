import { configDotenv } from 'dotenv';
import { z } from 'zod';

const configSchema = z
  .object({
    server_port: z.number(),
    db_host: z.string(),
    db_port: z.number(),
    db_username: z.string(),
    db_password: z.string(),
    db_database: z.string(),

    super_admin_pswd: z.string(),
    jwt_secret: z.string(),
  })
  .strict();

class Config {
  readonly server_port: number;
  readonly db_host: string;
  readonly db_port: number;
  readonly db_username: string;
  readonly db_password: string;
  readonly db_database: string;
  readonly super_admin_pswd: string;
  readonly jwt_secret: string;

  constructor() {
    if (process.env.NODE_ENV !== 'prod') configDotenv();

    this.server_port = Number(process.env.SERVER_PORT);

    this.db_host = process.env.DB_HOST;
    this.db_port = Number(process.env.DB_PORT);
    this.db_username = process.env.DB_USERNAME;
    this.db_password = process.env.DB_PASSWORD;
    this.db_database = process.env.DB_DATABASE;
    this.super_admin_pswd = process.env.SUPER_ADMIN_PSWD;
    this.jwt_secret = process.env.JWT_SECRET;

    configSchema.parse(this);
  }
}

export const config = new Config();
