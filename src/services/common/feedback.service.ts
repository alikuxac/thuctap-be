import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FeedbackEntity } from '#entities/feedback.entity';
import { createFeedbackDto } from '#dto/feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async all(): Promise<FeedbackEntity[]> {
    return await this.feedbackRepository.find();
  }

  async findByID(id: number): Promise<FeedbackEntity> {
    return await this.feedbackRepository.findOne({
      where: { id },
    });
  }

  async create(createFeedback: createFeedbackDto) {
    return await this.feedbackRepository.save(createFeedback);
  }
}
