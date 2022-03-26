import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VoucherService } from '#services/common/voucher.service';
import { createVoucherDto, updateVoucherDto } from '#dto/voucher.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('voucher')
@ApiTags('voucher')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Roles('admin')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  // Get all voucher
  @Get()
  async getAllVoucher() {
    return await this.voucherService.all();
  }

  @Get('/:id')
  async getVoucherByID(@Param('id') id: number) {
    return await this.voucherService.findByID(id);
  }

  @Get('/code/:code')
  async getVoucherByCode(@Param('code') code: string) {
    return await this.voucherService.findByCode(code);
  }

  @Post()
  async createVoucher(@Body() createVoucher: createVoucherDto) {
    return await this.voucherService.create(createVoucher);
  }

  @Put()
  async updateVoucher(@Body() updateVoucher: updateVoucherDto) {
    return await this.voucherService.update(updateVoucher);
  }

  @Delete('/:id')
  async deleteVoucher(@Param('id') id: number) {
    return await this.voucherService.delete(id);
  }
}
