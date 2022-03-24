import {
  IsString,
  IsNotEmpty,
  Max,
  MaxLength,
  ValidateIf,
  IsEnum,
  IsDefined,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus, ProductType } from '#interfaces/product.interface';
import { createCategorytDto } from '../category.dto';
import { createPriceDto } from './price.dto';
import { PriceSize } from '#entities/product/price.entity';
import { ApiProperty } from '@nestjs/swagger';

export class createProductDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @Max(100, { message: 'Description is too long' })
  description: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @ValidateIf((_object, value) => value !== null)
  image: string | null;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({ required: true })
  @IsDefined()
  @ValidateNested()
  @Type(() => createCategorytDto)
  category: createCategorytDto;

  @ApiProperty({ required: true })
  @ValidateNested({ each: true })
  @Type(() => createPriceDto)
  prices: createPriceDto[];
}

export class updateProductDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @Max(100, { message: 'Description is too long' })
  description: string;

  @IsString()
  @MaxLength(100)
  @ValidateIf((_object, value) => value !== null)
  image: string | null;

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;

  @IsNumber()
  @IsOptional()
  categoryId: number;
}

export class updateProductPrice {
  @IsNumber()
  @IsNotEmpty()
  priceId: number;

  @IsEnum(PriceSize)
  @IsNotEmpty()
  size: PriceSize;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
