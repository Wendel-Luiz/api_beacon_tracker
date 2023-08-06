import { Injectable } from '@nestjs/common';
import { GetUserResponse } from './getUser.schema';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Injectable()
export class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userRequest: UserRequest): Promise<GetUserResponse> {
    const user = await this.userRepo.findById(userRequest.id);
    if (!user) {
      throw new EntityNotFound(`user of id (${userRequest.id}) not found`);
    }

    return {
      user: {
        id: user.uuid,
        email: user.email,
        name: user.name,
        phone: user.phone,
        thumbnail: user.thumbnail,
      },
    };
  }
}
