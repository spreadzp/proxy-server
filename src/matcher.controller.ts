import { Controller, Get, Param, HttpException, HttpStatus, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Host } from './host';

@Controller('matcher')
export class MatcherController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  matcherKey(@Req() request): Promise<any> {
    return this.appService.getAllReq(request.originalUrl + '/', Host.DEX);
  }
  @Get('**')
  matcherObStatus(@Req() request): Promise<any> {
    return this.appService.getAllReq(request.originalUrl, Host.DEX);
  }
}
