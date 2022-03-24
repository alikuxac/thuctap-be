import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '#entities/order/Order.entity';
import { ProductEntity } from '#entities/product/product.entity';
import { TableEntity } from '#entities/table.entity';
import { createOrderDto } from '#dto/order/order.dto';
import { OrderStatus } from '#interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(TableEntity)
    private readonly tableRepository: Repository<TableEntity>,
  ) {}

  private async checkTableExist(tableId: number) {
    return new Promise((resolve, reject) => {
      this.tableRepository
        .findOne({
          where: {
            id: tableId,
          },
        })
        .then(() => {
          return resolve(true);
        })
        .catch(() => reject(false));
    });
  }

  async all(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  async findByID(id: number): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }

  async createOrder(order: createOrderDto) {
    const error: { message: string }[] = [];

    const tableOrderExist = await this.checkTableExist(order.tableId);
    tableOrderExist ? undefined : error.push({ message: 'Table not found' });

    for (const item of order.orderItems) {
      const productExist = await this.productRepository.findOne({
        where: { id: item.productId },
      });
      if (!productExist) {
        error.push({ message: `Product ${item.productId} not found` });
      }
    }

    if (error.length > 0) {
      throw new ConflictException(error);
    }
    const productIds = order.orderItems.map((item) => item.productId);
    const products = await this.productRepository.findByIds(productIds);

    const orderEntity = OrderEntity.fromDto(order, products);

    return await this.orderRepository.save(orderEntity);
  }

  async cancelOrder(id: number) {
    const cancelOrderExist = await this.orderRepository.findOne({
      where: {
        id,
      },
    });
    if (!cancelOrderExist) {
      throw new NotFoundException({
        message: 'Order not found',
      });
    }
    await this.orderRepository.update(
      {
        id,
      },
      {
        status: OrderStatus.CANCELLED,
      },
    );
  }
}
