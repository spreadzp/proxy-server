import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { MatcherController } from './matcher.controller';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '@nest-middlewares/cors';

@Module({
  imports: [],
  controllers: [MatcherController],
  providers: [AppService],
})
export class MatcherModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({});
    CorsMiddleware.configure({});
    consumer
      .apply(HelmetMiddleware, CorsMiddleware)
      .forRoutes({ path: '**', method: RequestMethod.GET });  
  }
}