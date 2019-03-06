import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import bodyParser = require('body-parser');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('routes')
  async routes() {
    return await this.appService.getRoutes();
  }

  @Post('check')
  async check(@Body('lat') lat, @Body('lng') lng){
    return await this.appService.check(lat, lng)
  }
}
