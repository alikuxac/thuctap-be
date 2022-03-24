import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class createFeedbackDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  rate: number;
}
