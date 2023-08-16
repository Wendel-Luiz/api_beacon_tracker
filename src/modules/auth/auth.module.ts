import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { LoginUseCase } from './usecases/login/login.usecase';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtLocalService } from './utils/jwt.service';
import { config } from 'src/config/env.config';
import { UserRepository } from './repositories/user.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { RoleRepository } from './repositories/role.repository';
import { SigninUseCase } from './usecases/signin/signin.usecase';
import { HealthCheckUseCase } from './usecases/healthcheck/healthcheck.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role, User]),
    JwtModule.register({
      secret: config.jwt_secret,
      global: true,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    SigninUseCase,
    JwtGuard,
    JwtLocalService,
    UserRepository,
    PermissionRepository,
    RoleRepository,
    HealthCheckUseCase,
  ],
  exports: [
    TypeOrmModule,
    JwtLocalService,
    UserRepository,
    PermissionRepository,
    RoleRepository,
  ],
})
export class AuthModule {}
