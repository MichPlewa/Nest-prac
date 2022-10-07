import { Tags } from '../enums/tags.enum';

export interface CreateProductDTO {
  name: string;
  price: number;
  count: number;
  tags: Tags[];
  description: string;
}
