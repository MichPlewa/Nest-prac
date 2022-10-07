import { EntityRepository, Repository } from 'typeorm';
import { UserAddress } from './userAddress.entity';
@EntityRepository(UserAddress)
export class UserAddressRepository extends Repository<UserAddress> {
  async deleteUserAddressesByUserId(userId: string): Promise<void> {
    const usersAddresses = await this.find({
      where: {
        id: userId,
      },
    });

    this.remove(usersAddresses);
  }
}
