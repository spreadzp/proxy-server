import { Controller, Get, Param, HttpException, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { AppService } from '../app.service';
import { Host } from '../host';

@Controller('node')
export class NodeController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  matcherKey(@Req() request): Promise<any> {
    const urlNoNode = request.originalUrl.includes('node') ? request.originalUrl.replace(/\/node/gi, '') : request.originalUrl;
    return this.appService.getAllReq(urlNoNode + '/', Host.NDX_NODE);
  }
  @Get('**')
  async matcherObStatus(@Req() request): Promise<any> {
    const urlNoNode = request.originalUrl.includes('node') ? request.originalUrl.replace(/\/node/gi, '') : request.originalUrl;
    return await this.appService.getAllReq(urlNoNode, Host.NDX_NODE);
  }
}
