import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Tag } from './orderTag.entity';
import { OrderedProducts } from './orderedProducts.entity';
import { User } from '../../users/db/users.entity';
import { UserAddress } from '../../users/db/userAddress.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    (type) => OrderedProducts,
    (orderedProducts) => orderedProducts.orderId,
  )
  @JoinTable({
    name: 'orderedProducts',
    joinColumn: {
      name: 'orderId',
    },
    inverseJoinColumn: {
      name: 'productId',
    },
  })
  orderItems: OrderedProducts[];

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @JoinTable({
    name: 'state',
    joinColumn: {
      name: 'orderId',
    },
    inverseJoinColumn: {
      name: 'tagId',
    },
  })
  state: Tag[];

  @JoinTable({
    name: 'orderedAddresses',
    joinColumn: {
      name: 'orderId',
    },
    inverseJoinColumn: {
      name: 'addressId',
    },
  })
  address: UserAddress[];

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;
}
