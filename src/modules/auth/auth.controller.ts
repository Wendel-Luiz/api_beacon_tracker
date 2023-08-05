import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from './usecases/login/login.usecase';
import { LoginRequest, LoginResponse } from './usecases/login/login.schema';

@Controller('auth')
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    return await this.loginUseCase.execute(body);
  }
}
