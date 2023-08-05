import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteCustomerRepository } from './deleteCustomer.repository';
import {
  DeleteCustomerParam,
  DeleteCustomerResponse,
} from './deleteCustomer.schema';
import { UserRequest } from 'src/modules/shared/shemas/user.schema';
import { roleCanDelete } from 'src/modules/auth/utils/roleHierarchy';

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private repo: DeleteCustomerRepository) {}

  async execute(
    param: DeleteCustomerParam,
    user: UserRequest,
  ): Promise<DeleteCustomerResponse> {
    const customer = await this.repo.findCustomerById(param.id);
    if (!customer) {
      throw new NotFoundException(`customer of id (${param.id}) not found.`);
    }

    if (!roleCanDelete(user.role, customer.role.slug)) {
      throw new UnauthorizedException(
        `not enougth permission to delete user (${customer.id})`,
      );
    }

    await this.repo.deleteCustomer(customer);

    return {
      message: 'successfully deleted.',
    };
  }
}
