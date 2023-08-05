import { Injectable, NotFoundException } from '@nestjs/common';
import { validatePassword } from 'src/utils/auth/hash';
import { LoginRepository } from './login.repository';
import { LoginRequest, LoginResponse } from './login.schema';
import { JwtPayload } from '../../schemas/jwtPayload.schema';
import { JwtLocalService } from '../../utils/jwt.service';

@Injectable()
export class LoginUseCase {
  constructor(
    private repo: LoginRepository,
    private jwtLocalService: JwtLocalService,
  ) {}

  async execute(dto: LoginRequest): Promise<LoginResponse> {
    const user = await this.repo.findUser(dto.email);
    if (!user) {
      throw new NotFoundException(`User not exists or password is incorrect.`);
    }

    const isValid = await validatePassword(dto.password, user.password);
    if (!isValid) {
      throw new NotFoundException(`User not exists or password is incorrect.`);
    }

    return {
      token: this.jwtLocalService.sign(user.uuid, user.role.slug),
    };
  }
}
