import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { v4 as uuidv4 } from 'uuid';
import { OrderRepository } from './db/orders.repository';
import { Order } from './db/orders.entity';
import { Connection } from 'typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../users/db/users.entity';
import { ProductRepository } from '../products/db/product.repository';

@Injectable()
export class OrdersDataService {
  constructor(
    private ordersRepository: OrderRepository,
    private productRepository: ProductRepository,
    private connection: Connection,
  ) {}

  private orders: Array<Order> = [];

  async addOrder(order: CreateOrderDTO, user: User): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToSave = new Order();

      orderToSave.id = uuidv4();
      orderToSave.price = order.price;
      orderToSave.description = order.description;
      orderToSave.state = order.state;
      orderToSave.createdAt = order.createdAt;
      orderToSave.updatedAt = order.updatedAt;
      orderToSave.address = order.address;
      orderToSave.user = user;
      orderToSave.orderItems = [];

      for (const orderItem of order.orderItems) {
        const product = await this.productRepository.findOne(orderItem.product);
        orderToSave.orderItems.push({
          id: uuidv4(),
          product: product,
          quantity: orderItem.quantity,
          orderId: orderItem.orderId,
          price: orderItem.price,
          createdAt: orderItem.createdAt,
          updatedAt: orderItem.updatedAt,
        });
      }

      return await manager
        .getCustomRepository(OrderRepository)
        .save(orderToSave);
    });
  }

  async getOrderById(id: string): Promise<Order> {
    return this.ordersRepository.findOne(id);
  }

  async getOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async deleteOrder(id: string): Promise<void> {
    this.ordersRepository.delete(id);
  }

  async updateOrder(id: string, order: UpdateOrderDTO): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToUpdate = await manager
        .getCustomRepository(OrderRepository)
        .findOne(id);

      orderToUpdate.price = order.price;
      orderToUpdate.description = order.description;
      orderToUpdate.state = order.state;
      orderToUpdate.createdAt = order.createdAt;
      orderToUpdate.updatedAt = order.updatedAt;

      return await manager
        .getCustomRepository(OrderRepository)
        .save(orderToUpdate);
    });
  }

  async addProductToOrder(id: string, order: UpdateOrderDTO): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToUpdate = await manager
        .getCustomRepository(OrderRepository)
        .findOne(id);

      orderToUpdate.price = order.price;
      orderToUpdate.description = order.description;
      orderToUpdate.state = order.state;
      orderToUpdate.createdAt = order.createdAt;
      orderToUpdate.updatedAt = order.updatedAt;

      return await manager
        .getCustomRepository(OrderRepository)
        .save(orderToUpdate);
    });
  }

  async updateUserAddress(id: string, order: UpdateOrderDTO): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToUpdate = await manager
        .getCustomRepository(OrderRepository)
        .findOne(id);

      orderToUpdate.price = order.price;
      orderToUpdate.description = order.description;
      orderToUpdate.state = order.state;
      orderToUpdate.createdAt = order.createdAt;
      orderToUpdate.updatedAt = order.updatedAt;

      return await manager
        .getCustomRepository(OrderRepository)
        .save(orderToUpdate);
    });
  }

  async deleteProductFromOrder(
    id: string,
    order: UpdateOrderDTO,
  ): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToUpdate = await manager
        .getCustomRepository(OrderRepository)
        .findOne(id);

      orderToUpdate.price = order.price;
      orderToUpdate.description = order.description;
      orderToUpdate.state = order.state;
      orderToUpdate.createdAt = order.createdAt;
      orderToUpdate.updatedAt = order.updatedAt;

      return await manager
        .getCustomRepository(OrderRepository)
        .save(orderToUpdate);
    });
  }
}
