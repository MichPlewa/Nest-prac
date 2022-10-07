import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductRepository } from './db/product.repository';
import { TagRepository } from './db/tag.repository';
import { Product } from './db/products.entity';
import { Tag } from './db/tag.entity';
import { UpdateProductDTO } from './dto/update-product.dto';
import { EntityManager } from 'typeorm';
import { Connection } from 'typeorm';
import { ProductsQuery } from './queries/ProductsQuery.interface';
@Injectable()
export class ProductsDataService {
  constructor(
    private productRepository: ProductRepository,
    private tagRepository: TagRepository,
    private connection: Connection,
  ) {}

  private products: Array<Product> = [];

  async addProduct(item: CreateProductDTO): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);

      const productToSave = new Product();

      productToSave.name = item.name;
      productToSave.price = item.price;
      productToSave.tags = tags;
      productToSave.count = item.count;

      return await manager
        .getCustomRepository(ProductRepository)
        .save(productToSave);
    });
  }

  async deleteProduct(id: string): Promise<void> {
    this.productRepository.delete(id);
  }

  async updateProduct(id: string, item: UpdateProductDTO): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
      const productToUpdate = await manager
        .getCustomRepository(ProductRepository)
        .findOne(id);

      productToUpdate.name = item.name;
      productToUpdate.price = item.price;
      productToUpdate.tags = tags;

      return await manager
        .getCustomRepository(ProductRepository)
        .save(productToUpdate);
    });
  }

  getProductById(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  getAllProducts(_query_: ProductsQuery): Promise<Product[]> {
    return this.productRepository.findAll(_query_);
  }
}
