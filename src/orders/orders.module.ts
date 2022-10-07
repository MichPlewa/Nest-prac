import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersDataService } from './orders-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './db/orders.repository';
import { ProductRepository } from '../products/db/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
  ],

  controllers: [OrdersController],
  providers: [OrdersDataService],
})
export class OrdersModule {}
