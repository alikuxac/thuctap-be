import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CategoryStatus } from '#interfaces/category.interface';
import { createCategorytDto } from '#dto/category.dto';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ name: 'description', length: 100, default: '' })
  description: string;

  @Column({
    name: 'status',
    type: 'enum',
    default: CategoryStatus.Enabled,
    enum: CategoryStatus,
  })
  status: string;

  static fromDto(dto: createCategorytDto) {
    const entity = new CategoryEntity();

    entity.name = dto.name;
    entity.description = dto.description;
    entity.status = dto.status;

    return entity;
  }
}
