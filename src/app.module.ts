import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbconnection } from './db.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, dbconnection],
  exports: [dbconnection]
})
export class AppModule {}
