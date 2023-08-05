import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class DeleteCustomerRepository {
  constructor(
    @InjectRepository(User)
    private customerRepository: Repository<User>,
  ) {}

  async findCustomerById(id: string): Promise<User> {
    return await this.customerRepository.findOne({
      where: {
        uuid: id,
      },
      relations: {
        role: true,
      },
    });
  }

  async deleteCustomer(customer: User): Promise<void> {
    await this.customerRepository.softRemove(customer);
  }
}
