import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppService } from '../app.service';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '../cors.midlleware';
import { VoteController } from './vote,controller';
@Module({
  imports: [],
  controllers: [VoteController],
  providers: [AppService],
})
export class VoteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({});
    consumer
      .apply(HelmetMiddleware, CorsMiddleware)
      .forRoutes({ path: '**', method: RequestMethod.GET });  
  }
}