import { Injectable } from '@nestjs/common';
import { validatePassword } from 'src/utils/auth/hash';
import { LoginRequest, LoginResponse } from './login.schema';
import { JwtLocalService } from '../../utils/jwt.service';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    private userRepo: UserRepository,
    private jwtLocalService: JwtLocalService,
  ) {}

  async execute(dto: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw new EntityNotFound(`User not exists or password is incorrect`);
    }

    const isValid = await validatePassword(dto.password, user.password);
    if (!isValid) {
      throw new EntityNotFound(`User not exists or password is incorrect`);
    }

    return {
      token: this.jwtLocalService.sign(user.uuid, user.role.slug),
    };
  }
}
