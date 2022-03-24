import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from '#services/common/category.service';
import { createCategorytDto } from '#dto/category.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('category')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Roles('admin')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory() {
    return await this.categoryService.getAll();
  }

  @Post()
  async create(@Body() dto: createCategorytDto) {
    return await this.categoryService.create(dto);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.categoryService.getById(id);
  }
}
