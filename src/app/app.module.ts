import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from '../app.service';
import { MatcherModule } from '../matcher/matcher.module';
import { NotFoundModule } from '../notFound/notFound.module';
import { NodeModule } from '../nodeNdx/node.module';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '../cors.midlleware';
import { VoteModule } from '../vote/vote.module';

@Module({
  imports: [MatcherModule, NodeModule, VoteModule, NotFoundModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({});
    consumer
      .apply(HelmetMiddleware, CorsMiddleware)
      .forRoutes({ path: '**', method: RequestMethod.GET });  
  }
}
