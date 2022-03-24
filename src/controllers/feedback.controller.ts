import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FeedbackService } from '#services/common/feedback.service';
import { createFeedbackDto } from '#dto/feedback.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('feedback')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Roles('admin')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Get all feedback
  @Get()
  async getAllFeedback() {
    return await this.feedbackService.all();
  }

  @Post()
  async createFeedback(@Body() createFeedback: createFeedbackDto) {
    return await this.feedbackService.create(createFeedback);
  }

  @Get('/:id')
  async getFeedbackByID(@Param('id') id: number) {
    return await this.feedbackService.findByID(id);
  }
}
