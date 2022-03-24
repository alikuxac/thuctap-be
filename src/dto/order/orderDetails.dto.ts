import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailsDto {
  @ApiProperty({ required: true })
  @IsNumber()
  productId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @Min(1)
  amount: number;
}
