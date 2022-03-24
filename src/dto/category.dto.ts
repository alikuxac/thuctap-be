import { IsNotEmpty, IsEmpty, IsEnum, Length } from 'class-validator';
import { CategoryStatus } from '#interfaces/category.interface';
import { ApiProperty } from '@nestjs/swagger';

export class createCategorytDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Length(10, 50)
  name: string;

  @ApiProperty({ required: true })
  @IsEmpty()
  @Length(10, 100)
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(CategoryStatus)
  status: CategoryStatus;
}
