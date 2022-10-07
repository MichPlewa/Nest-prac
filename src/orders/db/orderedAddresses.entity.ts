import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orderedAddresses' })
export class OrderedAddresses {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
