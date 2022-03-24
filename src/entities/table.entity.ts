import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Max } from 'class-validator';

@Entity({ name: 'table' })
export class TableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', nullable: false, unique: true })
  name: string;

  @Column({ name: 'limit', type: 'int', nullable: false })
  @Max(20)
  limit: number;

  @Column({ enum: ['Trống', 'Có người'], default: 'Trống' })
  status: string;
}
