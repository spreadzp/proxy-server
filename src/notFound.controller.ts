import { Controller, Get, Param, HttpException, HttpStatus, Query, Req, Res } from '@nestjs/common'; 

@Controller()
export class NotFoundController {
  @Get('/favicon.ico')
  favicon(@Res() res){
    return res.status(HttpStatus.OK);
  }

   @Get('*')
  notFound(): string {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'Its not true request',
    }, 403);
  }  
}
