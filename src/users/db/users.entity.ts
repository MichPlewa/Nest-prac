import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

import { Roles } from '../enums/roles.enum';
import { UserAddress } from './userAddress.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstName: string;
  @Column({ length: 100 })
  lastName: string;
  @Column({ length: 100 })
  email: string;
  @CreateDateColumn({ type: 'timestamp' })
  dateOfBirth: Date;
  @OneToMany((type) => UserAddress, (address) => address.user)
  @JoinTable({
    name: 'users_addresses',
    joinColumn: {
      name: 'user',
    },
    inverseJoinColumn: {
      name: 'addressId',
    },
  })
  address: UserAddress[];

  @Column({ length: 100 })
  @Column('enum', {
    enum: Roles,
  })
  role: Roles[];
}
