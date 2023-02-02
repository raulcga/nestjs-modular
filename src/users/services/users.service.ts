import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from '../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  private counterId = 1;
  users = [
    {
      id: 1,
      name: 'Juan',
    },
    ,
  ];
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  getUsers() {
    const apiKey = this.configService.get('API_KEY');
    const databaseName = this.configService.get('DATABASE_NAME');

    console.log(apiKey, databaseName);
    return this.users;
  }

  findOne(userId: number) {
    return this.users.find((user) => (user.id = userId));
  }

  create(payload: CreateUserDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
