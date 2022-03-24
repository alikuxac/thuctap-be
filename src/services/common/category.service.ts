import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '#entities/category.entity';
import { createCategorytDto } from '#dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async getById(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({
      where: { id },
    });
  }
  async create(dto: createCategorytDto) {
    const categoryExist = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });
    if (categoryExist) {
      throw new ConflictException('Category name is exist');
    }
    return await this.categoryRepository.save(CategoryEntity.fromDto(dto));
  }
}
