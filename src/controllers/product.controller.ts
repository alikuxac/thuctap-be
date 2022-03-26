import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from '#services/product.service';
import {
  createProductDto,
  updateProductDto,
  updateProductPrice,
} from '#dto/product/product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/role.decorator';

@Controller('product')
@ApiTags('product')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Roles('admin')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Get all products
  @Get()
  async getAllProducts() {
    return await this.productService.all();
  }

  @Post()
  async create(@Body() createProduct: createProductDto) {
    return await this.productService.create(createProduct);
  }

  @Put()
  async update(@Body() updateProduct: updateProductDto) {
    return await this.productService.update(updateProduct);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.productService.findByID(id);
  }

  @Put('/price')
  async updatePrice(@Body() newPrice: updateProductPrice) {
    return await this.productService.updatePrice(newPrice);
  }
}
