import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TableController } from '#controllers/table.controller';

import { TableService } from '#services/common/table.service';
import { TableEntity } from '#entities/table.entity';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([TableEntity])],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
