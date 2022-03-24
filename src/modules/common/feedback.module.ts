import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedbackService } from '#services/common/feedback.service';
import { FeedbackController } from '#controllers/feedback.controller';
import { FeedbackEntity } from '#entities/feedback.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([FeedbackEntity])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedBackModule {}
