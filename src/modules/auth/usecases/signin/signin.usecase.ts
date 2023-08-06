import { Injectable } from '@nestjs/common';

import { hashPassword } from 'src/utils/auth/hash';
import { JwtLocalService } from 'src/modules/auth/utils/jwt.service';
import { EntityAlreadyExists } from 'src/exceptions/entityAlreadyExists.exception';
import { RoleRepository } from 'src/modules/auth/repositories/role.repository';
import { SigninRequest, SigninResponse } from './signin.schema';
import { UserRepository } from '../../repositories/user.repository';
import { Role as RoleEnum } from '../../enums/roles.enum';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { Unauthorized } from 'src/exceptions/unauthorized.exception';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Injectable()
export class SigninUseCase {
  constructor(
    private userRepo: UserRepository,
    private roleRepo: RoleRepository,
    private jwtLocalService: JwtLocalService,
  ) {}

  async execute(
    dto: SigninRequest,
    userRequest?: UserRequest,
  ): Promise<SigninResponse> {
    const exists = await this.userRepo.exists({
      email: dto.email,
      phone: dto.phone,
    });
    if (exists) {
      throw new EntityAlreadyExists(
        `email (${dto.email}) or phone (${dto.phone}) already exists`,
      );
    }

    const role = await this.roleRepo.findByRoleEnum(dto.role);
    if (!role) {
      throw new EntityNotFound(`role (${dto.role}) not found`);
    }

    if (!this.canCreate(userRequest?.role, role.slug)) {
      throw new Unauthorized(
        `you don't have permission to create an ${role.title}`,
      );
    }

    const user = this.userRepo.create({
      ...dto,
      password: await hashPassword(dto.password),
      role,
    });

    const inserted = await this.userRepo.insert(user);

    return {
      customer: {
        id: inserted.uuid,
        name: inserted.name,
        email: inserted.email,
        phone: inserted.phone,
        thumbnail: inserted.thumbnail,
        token: this.jwtLocalService.sign(inserted.uuid, role.slug),
      },
    };
  }

  private canCreate(creatingRole: RoleEnum, createdRole: RoleEnum): boolean {
    switch (creatingRole) {
      case undefined:
      case RoleEnum.Customer:
        return createdRole === RoleEnum.Customer;
      case RoleEnum.Admin:
        return createdRole !== RoleEnum.SuperAdmin;
      case RoleEnum.SuperAdmin:
        return true;
    }
  }
}
