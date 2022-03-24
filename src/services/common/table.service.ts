import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TableEntity } from '#entities/table.entity';
import { createTableDto, updateStatusTableDto } from '#dto/table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(TableEntity)
    private readonly tableRepository: Repository<TableEntity>,
  ) {}

  async all(): Promise<TableEntity[]> {
    return await this.tableRepository.find();
  }

  async findByID(id: number): Promise<TableEntity> {
    return await this.tableRepository.findOne({
      where: { id },
    });
  }

  async findEmptyTable(): Promise<TableEntity[]> {
    return await this.tableRepository.find({
      where: {
        status: 'Trống',
      },
    });
  }

  async create(createTable: createTableDto) {
    const createExist = await this.tableRepository.findOne({
      where: { name: createTable.name },
    });
    if (createExist) {
      throw new Error('Table name is exist');
    }

    return await this.tableRepository.save(createTable);
  }

  async updateStatus(tableStatus: updateStatusTableDto) {
    const table = await this.tableRepository.findOne({
      where: { id: tableStatus.id },
    });
    if (!table) {
      throw new Error('Table not found');
    }

    table.status = tableStatus.status;
    return await this.tableRepository.save(table);
  }
}
