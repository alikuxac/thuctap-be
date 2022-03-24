import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '#services/user/user.service';
import { UserController } from '#controllers/user.controller';
import { UserEntity } from '#entities/user/user.entity';
import { ShiftEntity } from '#entities/staff/shift.entity';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity, ShiftEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
