import { Injectable } from '@nestjs/common';
import { CreateCustomerRepository } from './createCustomer.repository';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from './createCustomer.schema';
import { hashPassword } from 'src/utils/auth/hash';
import { JwtLocalService } from 'src/modules/auth/utils/jwt.service';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private repo: CreateCustomerRepository,
    private jwtLocalService: JwtLocalService,
  ) {}

  async execute(dto: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    const role = await this.repo.findCustomerRole();

    const customer = this.repo.createCustomer({
      ...dto,
      password: await hashPassword(dto.password),
      role,
    });

    const inserted = await this.repo.inserCustomer(customer);

    return {
      id: inserted.uuid,
      name: inserted.name,
      email: inserted.email,
      phone: inserted.phone,
      thumbnail: inserted.thumbnail,
      token: this.jwtLocalService.sign(inserted.uuid, role.slug),
    };
  }
}
