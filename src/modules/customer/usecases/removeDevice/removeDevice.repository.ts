import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class RemoveDeviceRepository {
  constructor(
    @InjectRepository(User)
    private customerRepository: Repository<User>,
  ) {}

  async findCustomerWithDevices(id: string): Promise<User> {
    return await this.customerRepository.findOne({
      where: {
        uuid: id,
      },
      relations: {
        devices: {
          device: {
            deviceModel: true,
          },
        },
      },
    });
  }

  async updateCustomer(customer: User): Promise<User> {
    return await this.customerRepository.save(customer);
  }
}
