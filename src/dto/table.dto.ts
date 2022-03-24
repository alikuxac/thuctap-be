import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { TableStatus } from '#interfaces/table.interface';
import { ApiProperty } from '@nestjs/swagger';
export class createTableDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  limit: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class updateStatusTableDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  status: TableStatus;
}
