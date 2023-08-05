import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/auth/entities/user.entity';
import { Role } from 'src/modules/auth/entities/role.entity';
import { Role as RoleEnum } from '../../../auth/enums/roles.enum';

@Injectable()
export class CreateCustomerRepository {
  constructor(
    @InjectRepository(User)
    private customerRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  createCustomer(customer: Partial<User>): User {
    return this.customerRepository.create(customer);
  }

  async findCustomerRole(): Promise<Role> {
    return this.roleRepository.findOne({
      where: {
        slug: RoleEnum.Customer,
      },
    });
  }

  async inserCustomer(customer: User): Promise<User> {
    return await this.customerRepository.save(customer);
  }
}
