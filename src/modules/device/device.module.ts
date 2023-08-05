import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './device.controller';
import { Device } from './entities/device.entity';
import { DeviceModel } from './entities/deviceModel.entity';
import { DeviceReading } from './entities/deviceReading.entity';
import { DeviceCategory } from './entities/deviceCategory.entity';
import { CreateDeviceUseCase } from './useCases/createDevice/createDevice.usecase';
import { CreateReadingUseCase } from './useCases/createReading/createReading.usecase';
import { CreateDeviceRepository } from './useCases/createDevice/createDevice.repository';
import { CreateReadingRepository } from './useCases/createReading/createReading.repository';
import { CreateDeviceCategoryUseCase } from './useCases/createDeviceCategory/createDeviceCategory.usecase';
import { CreateDeviceCategoryRepository } from './useCases/createDeviceCategory/createDeviceCategory.repository';
import { CreateDeviceModelUseCase } from './useCases/createDeviceModel/createDeviceModel.usecase';
import { CreateDeviceModelRepository } from './useCases/createDeviceModel/createDeviceModel.repository';
import { GetCategoriesUseCase } from './useCases/getCategories/getCategories.usecase';
import { GetCategoriesRepository } from './useCases/getCategories/getCategories.repository';
import { GetDeviceByIdUseCase } from './useCases/getDeviceById/getDevice.usecase';
import { GetDeviceByIdRepository } from './useCases/getDeviceById/getDevice.repository';
import { GetDeviceModelByCategoryUseCase } from './useCases/getModelsByCategory/getModelsByCategory.usecase';
import { GetDeviceModelByCategoryRepository } from './useCases/getModelsByCategory/getModelsByCategory.repository';
import { AuthModule } from '../auth/auth.module';

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
    CreateDeviceUseCase,
    CreateDeviceRepository,

    CreateReadingUseCase,
    CreateReadingRepository,

    CreateDeviceCategoryUseCase,
    CreateDeviceCategoryRepository,

    CreateDeviceModelUseCase,
    CreateDeviceModelRepository,

    GetCategoriesUseCase,
    GetCategoriesRepository,

    GetDeviceByIdUseCase,
    GetDeviceByIdRepository,

    GetDeviceModelByCategoryUseCase,
    GetDeviceModelByCategoryRepository,
  ],
})
export class DeviceModule {}
