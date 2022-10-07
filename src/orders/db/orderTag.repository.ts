import { EntityRepository, Repository, In } from 'typeorm';
import { Tag } from './orderTag.entity';

@EntityRepository(Tag)
export class OrderTagRepository extends Repository<Tag> {
  findTagsByName(names: string[]): Promise<Tag[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
