import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TableService } from '#services/common/table.service';
import { createTableDto, updateStatusTableDto } from '#dto/table.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('table')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Roles('admin')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  async getAllTable() {
    return await this.tableService.all();
  }

  @Get('/:id')
  async getTableByID(@Param('id') id: number) {
    return await this.tableService.findByID(id);
  }

  @Post()
  async createTable(@Body() createTable: createTableDto) {
    return await this.tableService.create(createTable);
  }

  @Put()
  async updateStatus(@Body() tableStatus: updateStatusTableDto) {
    return await this.tableService.updateStatus(tableStatus);
  }
}
