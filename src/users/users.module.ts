import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [ProductsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
