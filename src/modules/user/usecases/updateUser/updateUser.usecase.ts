import { Injectable, ConflictException } from '@nestjs/common';
import { UpdateUserRequest, UpdateUserResponse } from './updateUser.schema';
import { User } from 'src/modules/auth/entities/user.entity';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Injectable()
export class UpdateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(
    dto: UpdateUserRequest,
    userRequest: UserRequest,
  ): Promise<UpdateUserResponse> {
    const user = await this.userRepo.findById(userRequest.id);
    if (!user) {
      throw new EntityNotFound(`user of id (${userRequest.id}) not found`);
    }

    if (dto.name) {
      this.updateName(user, dto.name);
    }

    if (dto.email) {
      await this.updateEmail(user, dto.email);
    }

    if (dto.phone) {
      await this.updatePhone(user, dto.phone);
    }

    if (dto.thumbnail) {
      this.updateThumbnail(user, dto.thumbnail);
    }

    await this.userRepo.update(user);

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

  private updateName(user: User, name: string) {
    user.name = name;
  }

  private updateThumbnail(user: User, thumbnail: string) {
    user.thumbnail = thumbnail;
  }

  private async updateEmail(user: User, email: string) {
    const exists = await this.userRepo.exists({ email });
    if (exists) {
      throw new ConflictException(`email (${email}) already exists`);
    }

    user.email = email;
  }

  private async updatePhone(user: User, phone: string) {
    const exists = await this.userRepo.exists({ phone });
    if (exists) {
      throw new ConflictException(`phone (${phone}) already exists`);
    }

    user.phone = phone;
  }
}
