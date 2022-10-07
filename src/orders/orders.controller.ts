import {
  Post,
  Delete,
  Put,
  Get,
  Body,
  Param,
  ParseUUIDPipe,
  Controller,
  Patch,
} from '@nestjs/common';
import { CreateOrderDTO, CreateOrderProductDto } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { ExternalOrderDTO } from './dto/external-order.dto';
import { Order } from './db/orders.entity';
import { OrdersDataService } from './orders-data.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderRepository: OrdersDataService) {}

  @Post()
  async addOrder(@Body() _item_: CreateOrderDTO): Promise<ExternalOrderDTO> {
    return this.mapOrderToExternal(
      await this.orderRepository.addOrder(_item_, _item_.user),
    );
  }

  private mapOrderToExternal(order: Order): ExternalOrderDTO {
    return {
      id: order.id,
      price: order.price,
      description: order.description,
      state: order.state,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      address: order.address,
      user: order.user,
    };
  }

  @Delete(':id')
  async deleteOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.orderRepository.deleteOrder(id);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() _item_: UpdateOrderDTO,
  ): Promise<ExternalOrderDTO> {
    return this.mapOrderToExternal(
      await this.orderRepository.updateOrder(id, _item_),
    );
  }

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalOrderDTO> {
    return this.mapOrderToExternal(await this.orderRepository.getOrderById(id));
  }

  @Get() async getOrders(): Promise<ExternalOrderDTO[]> {
    return (await this.orderRepository.getOrders()).map((order) =>
      this.mapOrderToExternal(order),
    );
  }

  @Patch(':id/products')
  async addProductToOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() createOrderProductsDto: CreateOrderProductDto,
  ): Promise<ExternalOrderDTO> {
    return this.mapOrderToExternal(
      await this.orderRepository.addProductToOrder(id, createOrderProductsDto),
    );
  }

  @Delete(':id/products/:idOrderProduct')
  async deleteProductFromOrder(
    id: string,
    order: UpdateOrderDTO,
  ): Promise<Order> {
    return this.orderRepository.deleteProductFromOrder(id, order);
  }

  @Patch(':id/:userAddressId')
  async updateUserAddress(id: string, order: UpdateOrderDTO): Promise<Order> {
    return this.orderRepository.updateUserAddress(id, order);
  }
}
