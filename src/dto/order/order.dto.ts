import {
  IsString,
  ValidateNested,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '#interfaces/order.interface';
import { CreateOrderDetailsDto } from './orderDetails.dto';

export class createOrderDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  message: string;

  @ApiProperty({ required: true })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ required: true })
  @IsNumber()
  tableId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailsDto)
  orderItems: CreateOrderDetailsDto[];
}
