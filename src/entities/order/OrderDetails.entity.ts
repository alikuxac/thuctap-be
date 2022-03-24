import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './Order.entity';
import { CreateOrderDetailsDto } from '#dto/order/orderDetails.dto';
import { PriceSize, PriceEntity } from '#entities/product/price.entity';
import { ProductEntity } from '#entities/product/product.entity';
@Entity({ name: 'ordersDetails' })
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column({ nullable: false })
  productId: number;

  @Column({ name: 'productName', nullable: false })
  productName: string;

  @Column({ name: 'productBasePrice', nullable: false })
  productBasePrice: number;

  @Column({ name: 'size', nullable: false, enum: PriceSize })
  productSize: PriceSize;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @Column({ type: 'bigint', nullable: false })
  totalPrice: number;

  static fromDto(
    dto: CreateOrderDetailsDto,
    product: ProductEntity,
    priceEntity: PriceEntity,
  ): OrderDetailEntity {
    const entity = new OrderDetailEntity();
    entity.productId = product.id;
    entity.productName = product.name;
    entity.productBasePrice = priceEntity.price;
    entity.totalPrice = priceEntity.price * dto.amount;
    entity.amount = dto.amount;
    return entity;
  }
}
