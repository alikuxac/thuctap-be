import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '#entities/product/product.entity';
import {
  createProductDto,
  updateProductDto,
  updateProductPrice,
} from '#dto/product/product.dto';
import { CategoryEntity } from '#entities/category.entity';
import { PriceEntity } from '#entities/product/price.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(PriceEntity)
    private readonly priceRepositoty: Repository<PriceEntity>,
  ) {}

  async all(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findByID(id: number): Promise<ProductEntity> {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async create(createProduct: createProductDto) {
    // Check category exist
    const categoryExist = await this.categoryRepository.findOne({
      where: { name: createProduct.category.name },
    });
    if (!categoryExist) {
      throw new NotFoundException(
        'Category not found. Please create category first',
      );
    }
    const productExist = await this.productRepository.findOne({
      where: { name: createProduct.name },
    });

    if (productExist) {
      throw new ConflictException('Product name is exist');
    }

    const productEntity = ProductEntity.fromDto(createProduct, categoryExist);

    return await this.productRepository.save(productEntity);
  }

  async update(dto: updateProductDto) {
    const productExist = await this.productRepository.findOne({
      where: { id: dto.id },
    });

    const categoryExist = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });
    if (!categoryExist) {
      throw new NotFoundException(
        'Category not found. Please create category first',
      );
    }

    if (!productExist) {
      throw new ConflictException('Product exist');
    }

    const updateEntity = new ProductEntity();
    updateEntity.name = dto.name;
    updateEntity.description = dto.description;
    updateEntity.category = categoryExist;
    updateEntity.id = dto.id;
    updateEntity.image = dto.image;
    updateEntity.status = dto.status;

    return await this.productRepository.save(updateEntity);
  }

  async updatePrice(dto: updateProductPrice) {
    const priceExist = await this.priceRepositoty.findOne({
      where: { id: dto.priceId },
    });

    if (!priceExist) {
      throw new NotFoundException('This product does not have this price');
    }

    priceExist.price = dto.price;
    priceExist.size = dto.size;
    const savedPrice = await this.priceRepositoty.save(priceExist);
    delete savedPrice.product;
    return savedPrice;
  }
}
