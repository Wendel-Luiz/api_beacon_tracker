import { Injectable } from '@nestjs/common';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userRequest: UserRequest): Promise<void> {
    const user = await this.userRepo.findById(userRequest.id);
    if (!user) {
      throw new EntityNotFound(`user of id (${userRequest.id}) not found`);
    }

    await this.userRepo.delete(user);
  }
}
