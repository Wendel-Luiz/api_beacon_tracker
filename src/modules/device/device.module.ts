import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './device.controller';
import { Device } from './entities/device.entity';
import { DeviceModel } from './entities/deviceModel.entity';
import { DeviceReading } from './entities/deviceReading.entity';
import { DeviceCategory } from './entities/deviceCategory.entity';
import { CreateDeviceUseCase } from './useCases/createDevice/createDevice.usecase';
import { CreateReadingUseCase } from './useCases/createReading/createReading.usecase';
import { CreateDeviceCategoryUseCase } from './useCases/createDeviceCategory/createDeviceCategory.usecase';
import { CreateDeviceModelUseCase } from './useCases/createDeviceModel/createDeviceModel.usecase';
import { GetCategoriesUseCase } from './useCases/getCategories/getCategories.usecase';
import { GetDeviceByIdUseCase } from './useCases/getDeviceById/getDevice.usecase';
import { GetDeviceModelByCategoryUseCase } from './useCases/getModelsByCategory/getModelsByCategory.usecase';
import { AuthModule } from '../auth/auth.module';
import { DeviceRepository } from './repositories/device.repository';
import { DeviceModelRepository } from './repositories/deviceModel.repository';
import { DeviceCategoryRepository } from './repositories/deviceCategory.repository';
import { DeviceReadingRepository } from './repositories/deviceReading.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Device,
      DeviceCategory,
      DeviceModel,
      DeviceReading,
    ]),
    AuthModule,
  ],
  controllers: [DeviceController],
  providers: [
    DeviceRepository,
    DeviceModelRepository,
    DeviceCategoryRepository,
    DeviceReadingRepository,
    CreateDeviceUseCase,
    CreateReadingUseCase,
    CreateDeviceCategoryUseCase,
    CreateDeviceModelUseCase,
    GetCategoriesUseCase,
    GetDeviceByIdUseCase,
    GetDeviceModelByCategoryUseCase,
  ],
  exports: [
    DeviceRepository,
    DeviceModelRepository,
    DeviceCategoryRepository,
    DeviceReadingRepository,
  ],
})
export class DeviceModule {}
