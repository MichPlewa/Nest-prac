import { Roles } from '../enums/roles.enum';
import { UserAddress } from '../db/userAddress.entity';
export class ExternalUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: UserAddress[];
  dateOfBirth: Date;
  role: Roles[];
}

export class ExternalUserAddress {
  house: number;
  city: string;
  country: string;
  apartment: number;
  street: string;
}
