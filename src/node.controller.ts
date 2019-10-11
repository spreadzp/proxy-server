import { Controller, Get, Param, HttpException, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Host } from './host';

@Controller('node')
export class NodeController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  matcherKey(@Req() request): Promise<any> {
    const urlNoNode = request.originalUrl.includes('node') ? request.originalUrl.replace(/\/node/gi, '') : request.originalUrl;
    return this.appService.getAllReq(urlNoNode + '/', Host.NDX_NODE);
  }
  @Get('**')
  matcherObStatus(@Req() request, @Res() res): Promise<any> {
    const urlNoNode = request.originalUrl.includes('node') ? request.originalUrl.replace(/\/node/gi, '') : request.originalUrl;
    const respData =  this.appService.getAllReq(urlNoNode, Host.NDX_NODE);
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return res.status(HttpStatus.OK).json(respData);
  }
}
