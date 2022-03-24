import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Max } from 'class-validator';

@Entity({ name: 'vouchers' })
export class VoucherEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100, nullable: true })
  description?: string;

  @Column({ unique: true, length: 25 })
  code: string;

  @Column({ type: 'int', nullable: false })
  @Max(100)
  value: number;

  @Column({ type: 'enum', enum: ['Active', 'Inactive', 'Expired'] })
  status: string;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: false })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateStatus() {
    const now = new Date();
    if (this.startDate > now) {
      this.status = 'Inactive';
    } else if (this.endDate < now) {
      this.status = 'Expired';
    } else {
      this.status = 'Active';
    }
  }
}
