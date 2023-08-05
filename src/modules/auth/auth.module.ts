import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { LoginUseCase } from './usecases/login/login.usecase';
import { LoginRepository } from './usecases/login/login.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtRepository } from './guards/jwt.repository';
import { JwtGuard } from './guards/jwt.guard';
import { JwtLocalService } from './utils/jwt.service';
import { config } from 'src/config/env.config';

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
    LoginRepository,
    JwtGuard,
    JwtRepository,
    JwtLocalService,
  ],
  exports: [TypeOrmModule, JwtLocalService, JwtRepository],
})
export class AuthModule {}
