import { Pool, PoolClient, ConnectionConfig } from "pg";

const CONFIG: ConnectionConfig = {
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'root',
  database: 'cambridge'
}

export const dbconnection = {
  provide: 'dbconnection',
  useFactory: async (): Promise<ConnectionConfig> => {
    return await new Pool(CONFIG) as PoolClient;
  }
};