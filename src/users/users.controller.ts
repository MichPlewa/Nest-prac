import {
  Post,
  Delete,
  Put,
  Get,
  Body,
  Param,
  ParseUUIDPipe,
  Controller,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './db/users.entity';
import { UsersDataService } from './users-data.service';
import { UsersQuery } from './queries/UsersQuery.interface';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Post()
  async addUser(@Body() _item_: CreateUserDTO): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(await this.userRepository.addUser(_item_));
  }

  private mapUserToExternal(user: User): ExternalUserDTO {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
    };
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.userRepository.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() _item_: UpdateUserDTO,
  ): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(
      await this.userRepository.updateUser(id, _item_),
    );
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(await this.userRepository.getUserById(id));
  }

  @Get()
  async getUsers(@Body() query: UsersQuery): Promise<ExternalUserDTO[]> {
    return (await this.userRepository.getAllUsers(query)).map(
      this.mapUserToExternal,
    );
  }
}
