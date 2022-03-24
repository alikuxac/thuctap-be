import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from '#services/order.service';
import { OrderController } from '#controllers/order.controller';
import { OrderEntity } from '#entities/order/Order.entity';

import { TableModule } from './common/table.module';
import { ProductModule } from './product.module';
import { ProductEntity } from '#entities/product/product.entity';
import { TableEntity } from '#entities/table.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    TableModule,
    ProductModule,
    TypeOrmModule.forFeature([OrderEntity, ProductEntity, TableEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
