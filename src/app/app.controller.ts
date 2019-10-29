import { Controller, Get, Param, HttpException, HttpStatus, Query, Req, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { Host } from '../helpers/host';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  async emptyReq(@Req() request): Promise<any> {
    const urlNoApi = request.originalUrl.includes('api') ? request.originalUrl.replace(/\/api/gi, '') : request.originalUrl;
    const resp = await this.appService.getAllReq(urlNoApi, request.headers, Host.API);
    if (typeof resp === 'string') {
      return resp;
    } else {
      return resp;
    }
  }
  @Get('*')
  async oneApi(@Req() request): Promise<any> {
    let urlNoApi = request.originalUrl.includes('api') ? request.originalUrl.replace(/\/api/gi, '') : request.originalUrl;
    const resp = await this.appService.getAllReq(urlNoApi, request.headers, Host.API);
    if(urlNoApi.includes('matcher=')) {
      urlNoApi = urlNoApi.includes('matcher=') ? urlNoApi.replace(/matcher=/gi, 'matcher=G8oJkKutC9ME3LG4j3mRMr5466DqbsMqWetfJRszGnYw') : urlNoApi;
    console.log('1urlNoApi :', urlNoApi);
       }
    if (typeof resp === 'string') {
      return resp;
    } else {
      return resp;
    }
  }
  @Get('**')
  async allApi(@Req() request): Promise<any> {
    let urlNoApi = request.originalUrl.includes('api') ? request.originalUrl.replace(/\/api/gi, '') : request.originalUrl;
    if(urlNoApi.includes('matcher=')) {
      urlNoApi = urlNoApi.includes('matcher=') ? urlNoApi.replace(/matcher=/gi, 'matcher=G8oJkKutC9ME3LG4j3mRMr5466DqbsMqWetfJRszGnYw') : urlNoApi;
    console.log('1urlNoApi :', urlNoApi);
    }
    
    const resp = await this.appService.getAllReq(urlNoApi, request.headers, Host.API); 

    const res = (resp && resp.length === 1) ? resp[0] : resp;
   
    return resp;
  }

  @Post('**')
  async order(@Req() request, @Body() body): Promise<any> {
    const urlNoApi = request.originalUrl.includes('api') ? request.originalUrl.replace(/\/api/gi, '') : request.originalUrl;
    const resp = await this.appService.postAllReq(urlNoApi, request.headers, Host.DEX, body);    
    return resp;
  }
}
