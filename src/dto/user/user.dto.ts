import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDate,
  IsPhoneNumber,
  IsNumber,
  Min,
  IsBoolean,
  IsEnum,
  MinLength,
} from 'class-validator';
import { UserPosition } from '#interfaces/user.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sex: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  @IsOptional()
  mobile: string;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  birthday: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  idCard: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Point must be greater than 0' })
  point: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiPropertyOptional()
  @IsEnum(UserPosition)
  @IsOptional()
  position: string;
}

export class updateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  sex: string;

  @IsPhoneNumber()
  @IsOptional()
  mobile: string;

  @IsDate()
  @IsOptional()
  birthday: Date;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  idCard: string;

  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Point must be greater than 0' })
  point: number;

  @IsString()
  @IsOptional()
  avatar: string;
}

export class updateStatus {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
