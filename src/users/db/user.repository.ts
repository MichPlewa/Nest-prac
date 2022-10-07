import {
  Between,
  EntityRepository,
  Equal,
  FindConditions,
  FindManyOptions,
  LessThan,
  Like,
  MoreThan,
  Repository,
} from 'typeorm';
import { UsersQuery } from '../queries/UsersQuery.interface';
import { TextFilterType } from '../../shared/helper/TextFilter';
import { User } from './users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private buildPredicate(query: UsersQuery): FindManyOptions<User> {
    const predicate: FindConditions<User> = {};

    if (query.dateOfBirthLaterThan && query.dateOfBirthEarlierThan) {
      predicate.dateOfBirth = Between(
        query.dateOfBirthLaterThan,
        query.dateOfBirthEarlierThan,
      );
    } else if (query.dateOfBirthLaterThan) {
      predicate.dateOfBirth = MoreThan(query.dateOfBirthLaterThan);
    } else if (query.dateOfBirthEarlierThan) {
      predicate.dateOfBirth = LessThan(query.dateOfBirthEarlierThan);
    }

    if (query.firstName && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.firstName = Like(`%${query.firstName}%`);
    } else if (query.firstName) {
      predicate.firstName = Equal(query.firstName);
    }

    if (query.lastName && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.lastName = Like(`%${query.lastName}%`);
    } else if (query.lastName) {
      predicate.lastName = Equal(query.lastName);
    }

    if (query.email && query.nameFilterType === TextFilterType.CONTAINS) {
      predicate.email = Like(`%${query.email}%`);
    } else if (query.email) {
      predicate.email = Equal(query.email);
    }

    if (query.role) {
      predicate.role = Equal(query.role);
    }

    const findManyOptions: FindManyOptions<User> = {
      where: predicate,
    };

    return findManyOptions;
  }

  findAll(_query_: UsersQuery): Promise<User[]> {
    return this.find(this.buildPredicate(_query_));
  }

  getUserByEmail(_query_: UsersQuery): Promise<User> {
    return this.findOne(this.buildPredicate(_query_));
  }
}
