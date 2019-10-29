import { Controller, Get, Param, HttpException, HttpStatus, Query, Req, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly appService: AppService) {}

  @Get('*')
  voteOne(@Req() request): Promise<any> {
    return Promise.resolve({});
  }
  @Get('**')
  voteAll(@Req() request): Promise<any> {
    return Promise.resolve({});
  }
  @Post('**')
  async order(@Req() request, @Body() body): Promise<any> {  
    console.log('VOTE body 18 :', body);
    return Promise.resolve({});
  }
}
