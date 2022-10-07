import { Roles } from '../enums/roles.enum';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { UserAddress } from '../db/userAddress.entity';
import { OneToMany } from 'typeorm';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  dateOfBirth: Date;
  @OneToMany((type) => UserAddress, (address) => address.user)
  address: UserAddress[];
  @IsEnum(Roles)
  role: Roles[];
}

export class CreateUserAddressDTO {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  house: number;
  @IsNotEmpty()
  @IsNumber()
  apartment: number;
}
