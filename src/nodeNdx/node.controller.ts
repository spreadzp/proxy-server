import { Controller, Get, Param, HttpException, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { AppService } from '../app.service';
import { Host } from '../host';

@Controller('node')
export class NodeController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  matcherKey(@Req() request): Promise<any> {
    const urlNoNode = request.originalUrl.includes('node') ? request.originalUrl.replace(/\/node/gi, '') : request.originalUrl;
    return this.appService.getAllReq(urlNoNode + '/', request.headers, Host.NDX_NODE);
  }
  @Get('**')
  async matcherObStatus(@Req() request): Promise<any> {
    const urlNoNode = request.originalUrl.includes('node') ? request.originalUrl.replace(/\/node/gi, '') : request.originalUrl;
    const resp = await this.appService.getAllReq(urlNoNode, request.headers, Host.NDX_NODE);
    console.log('Matchresp :', resp);
    return resp;
  }
}
