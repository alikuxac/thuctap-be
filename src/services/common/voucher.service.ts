import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VoucherEntity } from '#entities/voucher.entity';
import { createVoucherDto, updateVoucherDto } from '#dto/voucher.dto';
import { VoucherStatus } from '#interfaces/voucher.interface';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(VoucherEntity)
    private readonly voucherRepository: Repository<VoucherEntity>,
  ) {}

  async all(): Promise<VoucherEntity[]> {
    return await this.voucherRepository.find();
  }

  async findByID(id: number): Promise<VoucherEntity> {
    return await this.voucherRepository.findOne({
      where: { id },
    });
  }

  async findByCode(code: string): Promise<VoucherEntity> {
    return await this.voucherRepository.findOne({
      where: { code },
    });
  }

  async create(createVoucher: createVoucherDto) {
    const createExist = await this.voucherRepository.findOne({
      where: { code: createVoucher.code },
    });
    if (createExist) {
      throw new Error('Voucher code is exist');
    }

    return await this.voucherRepository.save(createVoucher);
  }

  async update(updateVoucher: updateVoucherDto) {
    return await this.voucherRepository.update(
      {
        code: updateVoucher.code,
      },
      updateVoucher,
    );
  }

  async delete(id: number) {
    return await this.voucherRepository.delete({ id });
  }

  async changeStatus(id: number, status: VoucherStatus) {
    return await this.voucherRepository.update({ id }, { status });
  }
}
