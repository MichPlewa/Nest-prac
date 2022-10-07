import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Tag } from '../../products/db/tag.entity';
import { faker } from '@faker-js/faker';
import { User } from '../../users/db/users.entity';
import { UserAddress } from '../../users/db/userAddress.entity';

export class InitData1663083087528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.saveTags();
    this.saveProducts(await this.saveTags());
    this.saveUsers();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = [
      {
        name: 'NEW',
      },
      {
        name: 'PROMO',
      },
      {
        name: 'LAST_ITEMS',
      },
    ];

    for (const tag of tags) {
      const tagToSave = new Tag();
      tagToSave.name = tag.name;
      tagsArr.push(await getRepository('Tag').save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }

  private async saveProducts(tags: Tag[]): Promise<void> {
    const products = [];
    for (let i = 0; i < 10; i++) {
      const product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        count: faker.datatype.number(100),
        description: faker.lorem.paragraph(),
        tags: [tags[0], tags[1]],
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      products.push(product);
    }

    await getRepository('Product').save(products);
    console.log('Products saved');
  }

  private async saveUserAddress(): Promise<UserAddress[]> {
    const addressesArr: UserAddress[] = [];
    const userAddress = [];
    for (let i = 0; i < 10; i++) {
      const address = {
        house: faker.datatype.number(100),
        city: faker.address.city(),
        country: faker.address.country(),
        street: faker.address.street(),
        apartment: faker.datatype.number(100),
      };
      userAddress.push(address);

      for (const address of userAddress) {
        const addressToSave = new UserAddress();
        addressToSave.house = address.house;
        addressToSave.city = address.city;
        addressToSave.country = address.country;
        addressToSave.street = address.street;
        addressToSave.apartment = address.apartment;
        addressesArr.push(
          await getRepository('UserAddress').save(addressToSave),
        );
      }

      console.log('UserAddress saved');

      return addressesArr;
    }
  }

  private async saveUsers(): Promise<void> {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const savedId = faker.datatype.uuid();

      const user = {
        id: savedId,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        dateOfBirth: faker.date.past(),
        role: 'ADMIN',
        address: await this.saveUserAddress(),
      };
      users.push(user);
    }

    await getRepository('User').save(users);
    console.log('Users saved');
  }
}
