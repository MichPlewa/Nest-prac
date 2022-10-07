import { Roles } from '../enums/Roles.enum';
import { TextFilterType } from '../../shared/helper/TextFilter';

export interface UsersQuery {
  firstName?: string;
  lastName?: string;
  email?: string;
  nameFilterType?: TextFilterType;
  dateOfBirthLaterThan?: Date;
  dateOfBirthEarlierThan?: Date;
  role?: Roles[];
}
