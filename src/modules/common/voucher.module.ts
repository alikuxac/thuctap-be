import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoucherService } from '#services/common/voucher.service';

import { VoucherController } from '#controllers/voucher.controller';
import { VoucherEntity } from '#entities/voucher.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([VoucherEntity])],
  controllers: [VoucherController],
  providers: [VoucherService],
  exports: [VoucherService],
})
export class VoucherModule {}
