import { Controller, Get, Param, HttpException, HttpStatus, Query, Req } from '@nestjs/common';
import { AppService } from '../app.service';
import { Host } from '../host';

@Controller('v0')
export class AppController {
  constructor(private readonly appService: AppService) {} 
  @Get('**')
  allApi(@Req() request): Promise<any> {
    return this.appService.getAllReq(request.originalUrl, Host.API);
  } 
}
