import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from '../app.service';
import { MatcherModule } from '../matcher/matcher.module';
import { NotFoundModule } from '../notFound/notFound.module';
import { NodeModule } from '../nodeNdx/node.module';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '@nest-middlewares/cors';

@Module({
  imports: [MatcherModule, NodeModule, NotFoundModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({});
    CorsMiddleware.configure({});
    consumer
      .apply(HelmetMiddleware, CorsMiddleware)
      .forRoutes({ path: 'node/**', method: RequestMethod.GET });  
  }
}
