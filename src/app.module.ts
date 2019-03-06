import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './common/config.provider';
import { dbconnection } from './common/db.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Config, dbconnection],
  exports: [Config, dbconnection]
})
export class AppModule {}
