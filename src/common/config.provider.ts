import * as dotenv from 'dotenv';
dotenv.config();

export const Config = {
    provide: 'config',
    useFactory: () => {
      const Config = {
        db: {
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD ,
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          database : process.env.DB_NAME
        }  
	  }
    return Config
  }
};