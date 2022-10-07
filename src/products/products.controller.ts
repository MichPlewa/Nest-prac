import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RoleGuard } from '../shared/guards/role.guard';
import { dateToArray } from '../shared/helpers/date.helper';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsDataService } from './products-data.service';
import { Product } from './db/products.entity';
import { ProductsQuery } from './queries/ProductsQuery.interface';
@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.getProductById(id),
    );
  }

  @Get()
  async getAllProducts(
    @Query() query: ProductsQuery,
  ): Promise<Array<ExternalProductDto>> {
    return (await this.productRepository.getAllProducts(query)).map((product) =>
      this.mapProductToExternal(product),
    );
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() item: CreateProductDTO,
  ): Promise<ExternalProductDto> {
    const product = await this.productRepository.addProduct(item);
    return this.mapProductToExternal(product);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() item: UpdateProductDTO,
  ): Promise<ExternalProductDto> {
    const product = await this.productRepository.updateProduct(id, item);
    return this.mapProductToExternal(product);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(id: string): Promise<ExternalProductDto> {
    await this.productRepository.deleteProduct(id);
    return null;
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags.map((i) => i.name),
    };
  }
}
