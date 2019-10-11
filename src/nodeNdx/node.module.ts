import { Module, RequestMethod, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppService } from '../app.service';
import { NodeController } from './node.controller';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '../cors.midlleware';

@Module({
  imports: [],
  controllers: [NodeController],
  providers: [AppService],
})
export class NodeModule  implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      HelmetMiddleware.configure({});
      consumer
        .apply(HelmetMiddleware, CorsMiddleware)
        .forRoutes({ path: '**', method: RequestMethod.GET });  
    }
}