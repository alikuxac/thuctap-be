import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';

export class createVoucherDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ required: true })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ required: true })
  @IsDate()
  @IsNotEmpty()
  endDate: Date;
}

export class updateVoucherDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  value: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status: string;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  endDate: Date;
}

export class updateStatusVoucherDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
