import { Body, Controller, Post, Get } from '@nestjs/common';
import { LoginUseCase } from './usecases/login/login.usecase';
import { LoginRequest, LoginResponse } from './usecases/login/login.schema';
import { SigninRequest, SigninResponse } from './usecases/signin/signin.schema';
import { User } from './decorators/user.decorator';
import { SigninUseCase } from './usecases/signin/signin.usecase';
import { UserRequest } from 'src/shared/schemas/user.schema';
import { HealthCheckUseCase } from './usecases/healthcheck/healthcheck.usecase';

@Controller()
export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private signinUseCase: SigninUseCase,
    private healthCheckUseCase: HealthCheckUseCase,
  ) {}

  @Get('healthcheck')
  async healthcheck(): Promise<void> {
    return await this.healthCheckUseCase.execute();
  }

  @Post('auth/login')
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    return await this.loginUseCase.execute(body);
  }

  @Post('auth/signin')
  async signin(
    @Body() dto: SigninRequest,
    @User() user: UserRequest,
  ): Promise<SigninResponse> {
    return await this.signinUseCase.execute(dto, user);
  }
}
