import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CreateCustomerUseCase } from './usecases/createCustomer/createCustomer.usecase';
import { CreateCustomerRepository } from './usecases/createCustomer/createCustomer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDevice } from './entities/customerDevice.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerDevice]), AuthModule],
  controllers: [CustomerController],
  providers: [CreateCustomerUseCase, CreateCustomerRepository],
})
export class CustomerModule {}
