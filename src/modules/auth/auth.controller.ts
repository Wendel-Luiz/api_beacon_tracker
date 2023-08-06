import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from './usecases/login/login.usecase';
import { LoginRequest, LoginResponse } from './usecases/login/login.schema';
import { SigninRequest, SigninResponse } from './usecases/signin/signin.schema';
import { User } from './decorators/user.decorator';
import { SigninUseCase } from './usecases/signin/signin.usecase';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private signinUseCase: SigninUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    return await this.loginUseCase.execute(body);
  }

  @Post('signin')
  async signin(
    @Body() dto: SigninRequest,
    @User() user: UserRequest,
  ): Promise<SigninResponse> {
    return await this.signinUseCase.execute(dto, user);
  }
}
