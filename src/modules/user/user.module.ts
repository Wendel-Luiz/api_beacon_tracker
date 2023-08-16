import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDevice } from './entities/userDevice.entity';
import { AuthModule } from '../auth/auth.module';
import { GetUserUseCase } from './usecases/getUser/getUser.usecase';
import { UpdateUserUseCase } from './usecases/updateUser/updateUser.usecase';
import { DeleteUserUseCase } from './usecases/deleteUser/deleteUser.usecase';
import { UserDeviceRepository } from './repositories/userDevice.repository';
import { AddDeviceUseCase } from './usecases/addDevice/addDevice.usecase';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserDevice]), AuthModule, DeviceModule],
  controllers: [UserController],
  providers: [
    UserDeviceRepository,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    AddDeviceUseCase,
  ],
})
export class UserModule {}
