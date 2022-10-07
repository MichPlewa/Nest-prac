import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './orders.entity';
import { Product } from '../../products/db/products.entity';

@Entity({ name: 'orderedProducts' })
export class OrderedProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne((type) => Order, (orderId) => orderId.id, { onDelete: 'CASCADE' })
  orderId: Order;
  @ManyToOne((type) => Product, (productId) => productId.id, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'float', default: 0 })
  quantity: number;

  @Column({ type: 'float', default: 0 })
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
