import { Tags } from '../enums/tags.enum';

export interface UpdateProductDTO {
  name?: string;
  price?: number;
  count?: number;
  tags?: Tags[];
  updatedAt?: Array<number>;
  description?: string;
}
