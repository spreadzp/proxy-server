import { Controller, Get, Param, HttpException, HttpStatus, Query, Req, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { Host } from '../helpers/host';

@Controller('matcher')
export class MatcherController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  async matcherKey(@Req() request): Promise<any> {
    const resp = await this.appService.getAllReq(request.originalUrl, request.headers, Host.DEX);
    // console.log('resp :', resp);
    if (typeof resp === 'string') {
      return resp;
    } else {
      return resp;
    }
    
  }
  @Get('*')
  matcherOne(@Req() request): Promise<any> { 
    const resp = this.appService.getAllReq(request.originalUrl, request.headers, Host.DEX);    
    return resp;
  }
  @Get('**')
  matcherObStatus(@Req() request): Promise<any> {  
    const resp = this.appService.getAllReq(request.originalUrl, request.headers, Host.DEX);    
    return resp;
  }
  @Post('**')
  async order(@Req() request, @Body() body): Promise<any> { 
    const resp = await this.appService.postAllReq(request.originalUrl, request.headers, Host.DEX, body);    
    return resp;
  }
}
