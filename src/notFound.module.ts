import { Module } from '@nestjs/common';
import { NotFoundController } from './notFound.controller';

@Module({
  imports: [],
  controllers: [NotFoundController],
  providers: [],
})
export class NotFoundModule {}