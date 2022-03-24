import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ProductType, ProductStatus } from '#interfaces/product.interface';
import { CategoryEntity } from '../category.entity';
import { PriceEntity } from './price.entity';
import { createProductDto } from '#dto/product/product.dto';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 50, unique: true })
  name: string;

  @Column({ name: 'description', length: 100, default: '' })
  description!: string;

  @Column({ name: 'image', length: 100, nullable: true })
  image!: string;

  @Column({
    name: 'status',
    default: ProductStatus.ENABLED,
    enum: ProductStatus,
  })
  status: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ProductType,
    default: ProductType.Primary,
  })
  type: string;

  @OneToOne(() => CategoryEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => PriceEntity, (price) => price.product, {
    eager: true,
    cascade: true,
  })
  prices: PriceEntity[];

  static fromDto(dto: createProductDto, category: CategoryEntity) {
    const prices = dto.prices.map((dto) => PriceEntity.fromDto(dto));

    const entity = new ProductEntity();
    entity.name = dto.name;
    entity.description = dto.description;
    entity.image = dto.image;
    entity.status = dto.status;
    entity.type = dto.type;
    entity.category = category;
    entity.prices = prices;

    return entity;
  }
}
