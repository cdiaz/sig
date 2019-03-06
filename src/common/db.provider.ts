import { Pool, PoolClient, ConnectionConfig } from "pg";

export const dbconnection = {
  provide: 'dbconnection',
  useFactory: async (config): Promise<ConnectionConfig> => {
    console.log(config.db)
    return await new Pool(config.db) as PoolClient;
  },
  inject: ['config']
};