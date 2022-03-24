import { createStaffShiftDto } from '#dto/staff/shift.dto';
import { StaffSession } from '#interfaces/staff.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'staff_shift' })
export class ShiftEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'staffId', nullable: false })
  staffId: number;

  @Column({ name: 'session', comment: 'Ca làm việc', enum: StaffSession })
  session: StaffSession;

  @Column({
    name: 'timeBonus',
    type: 'int',
    default: 0,
    nullable: false,
    comment: 'Thời gian tăng ca',
  })
  timeBonus: number;

  @Column({ type: 'bit', default: 1, comment: 'Tăng ca?' })
  isExtra: number;

  static fromDto(staffId: number, dto: createStaffShiftDto) {
    const entity = new ShiftEntity();

    entity.staffId = staffId;
    entity.session = dto.session;
    entity.timeBonus = dto.timeBonus;
    entity.isExtra = dto.isExtra;

    return entity;
  }
}
