import { IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { PriceSize } from '#entities/product/price.entity';
import { ApiProperty } from '@nestjs/swagger';

export class createPriceDto {
  @ApiProperty({ required: true })
  @IsEnum(PriceSize)
  size: PriceSize;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class updateUpdateDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: true })
  @IsEnum(PriceSize)
  @IsNotEmpty()
  size: PriceSize;
}
