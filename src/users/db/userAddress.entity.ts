import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import { User } from './users.entity';
@Entity({ name: 'user_addresses' })
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0, type: 'float' })
  house: number;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  country: string;

  @Column({ default: 0 })
  apartment: number;

  @Column({ length: 100 })
  street: string;

  @ManyToOne((type) => User, (user) => user.address, {
    onDelete: 'CASCADE',
  })
  user: User;
}
