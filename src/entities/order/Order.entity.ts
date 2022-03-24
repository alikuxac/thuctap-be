import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { OrderStatus } from '#interfaces/order.interface';
import { createOrderDto } from '#dto/order/order.dto';

import { OrderDetailEntity } from './OrderDetails.entity';
import { ProductEntity } from '#entities/product/product.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'message',
    default: '',
    length: 100,
    nullable: false,
    comment: 'Ghi chú',
  })
  message: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.IN_PROGRESS,
  })
  status: string;

  @Column({ type: 'int', nullable: false })
  tableId: number;

  @Column({ type: 'bigint', nullable: false })
  totalPrice: number;

  @OneToMany(() => OrderDetailEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderDetailEntity[];

  static fromDto(dto: createOrderDto, products: ProductEntity[]) {
    const items = dto.orderItems.map((i) =>
      OrderDetailEntity.fromDto(
        i,
        products.filter((p) => p.id === i.productId)[0],
        products
          .filter((p) => {
            p.id === i.productId;
          })[0]
          .prices.filter((p) => p.product.id === i.productId)[0],
      ),
    );
    const totalPrice = items
      .map((i) => i.totalPrice)
      .reduce((acc, c) => acc + c);

    const entity = new OrderEntity();
    entity.message = dto.message;
    entity.totalPrice = totalPrice;
    entity.status = OrderStatus.PENDING;
    entity.tableId = dto.tableId;
    entity.orderItems = items;

    return entity;
  }
}
