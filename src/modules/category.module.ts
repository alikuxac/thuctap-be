import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryService } from '#services/common/category.service';
import { CategoryController } from '#controllers/category.controller';
import { CategoryEntity } from '#entities/category.entity';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
