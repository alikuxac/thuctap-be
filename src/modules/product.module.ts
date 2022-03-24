import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from '#controllers/product.controller';
import { ProductService } from '#services/product.service';
import { ProductEntity } from '#entities/product/product.entity';

import { CategoryModule } from './category.module';
import { PriceEntity } from '#entities/product/price.entity';
import { CategoryEntity } from '#entities/category.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    CategoryModule,
    TypeOrmModule.forFeature([ProductEntity, PriceEntity, CategoryEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
