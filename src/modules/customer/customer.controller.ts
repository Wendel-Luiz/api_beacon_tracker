import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerUseCase } from './usecases/createCustomer/createCustomer.usecase';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from './usecases/createCustomer/createCustomer.schema';

@Controller('customer')
export class CustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  async createCustomer(
    @Body() body: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    return await this.createCustomerUseCase.execute(body);
  }
}
