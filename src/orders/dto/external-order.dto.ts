import { State } from '../enums/orders.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAddress } from '../../users/db/userAddress.entity';
import { Tag } from '../db/orderTag.entity';
import { User } from '../../users/db/users.entity';

export class ExternalOrderDTO {
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsEnum(State)
  state: Tag[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne((type) => UserAddress, (address) => address.user)
  address: UserAddress[];
  @IsNotEmpty()
  user: User;
  productId?: string;
  userAddressId?: string;
}
