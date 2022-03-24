import { createPriceDto } from '#dto/product/price.dto';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

export enum PriceSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  NONE = 'None',
}

@Entity('product_price')
export class PriceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.prices)
  product: ProductEntity;

  @Column({
    name: 'size',
    enum: PriceSize,
    default: PriceSize.NONE,
  })
  size: PriceSize;

  @Column({ name: 'price', type: 'float', default: 0 })
  price: number;

  static fromDto(dto: createPriceDto) {
    const entity = new PriceEntity();
    entity.size = dto.size;
    entity.price = dto.price;
    return entity;
  }
}
