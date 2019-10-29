import { Controller, Get, Param, HttpException, HttpStatus, Query, Req, Res, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { Host } from '../helpers/host';

@Controller('node')
export class NodeController {
  constructor(private readonly appService: AppService) {}
  @Get('*')
 async matcherKey(@Req() request): Promise<any> {
    let urlNoNode = request.originalUrl.includes('node') ? request.originalUrl.replace(/\/node/gi, '') : request.originalUrl;
    urlNoNode = (urlNoNode.includes('matcher=')) ? urlNoNode.replace(/matcher=/gi, 'matcher=G8oJkKutC9ME3LG4j3mRMr5466DqbsMqWetfJRszGnYw') : urlNoNode; 
    const resp = await this.appService.getAllReq(urlNoNode, request.headers, Host.NDX_NODE);
    if (typeof resp === 'string') {
      return resp;
    } else {
      return resp;
    }
  }
  @Get('**')
  async matcherObStatus(@Req() request): Promise<any> {
    let urlNoNode = request.originalUrl.includes('node') ? request.originalUrl.replace(/\/node/gi, '') : request.originalUrl;
    urlNoNode = (urlNoNode.includes('matcher=')) ? urlNoNode.replace(/matcher=/gi, 'matcher=G8oJkKutC9ME3LG4j3mRMr5466DqbsMqWetfJRszGnYw') : urlNoNode;
   console.log('1urlNoNode :', urlNoNode);
    const resp = await this.appService.getAllReq(urlNoNode, request.headers, Host.NDX_NODE);
     
    return resp;
  }

  @Post('**')
  async order(@Req() request, @Body() body): Promise<any> {
    const urlNoNode = request.originalUrl.includes('node') ? request.originalUrl.replace(/\/node/gi, '') : request.originalUrl;
    console.log('2 rlNoNode :', urlNoNode);
    const resp = await this.appService.postAllReq(urlNoNode, request.headers, Host.DEX, body);    
    return resp;
  }
}
