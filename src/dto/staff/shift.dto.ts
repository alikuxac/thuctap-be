import { IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { StaffSession } from '#interfaces/staff.interface';
import { ApiProperty } from '@nestjs/swagger';

export class createStaffShiftDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  staffId: number;

  @ApiProperty({ required: true })
  @IsEnum(StaffSession)
  session: StaffSession;

  @ApiProperty({ required: true })
  @IsNumber()
  timeBonus: number;

  @ApiProperty({ required: true })
  @IsNumber()
  isExtra: 1 | 0;
}
