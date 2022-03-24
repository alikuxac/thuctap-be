import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'feedbacks' })
export class FeedbackEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 50, nullable: true })
  email!: string;

  @Column({ name: 'phone', type: 'varchar', length: 50, nullable: true })
  phone!: string;

  @Column({ name: 'content', type: 'varchar', length: 500 })
  content: string;

  @Column({ name: 'rate', type: 'int', nullable: false })
  rate: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
