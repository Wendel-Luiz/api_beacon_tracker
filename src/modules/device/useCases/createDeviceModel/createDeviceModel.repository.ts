import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceModel } from '../../entities/deviceModel.entity';
import { DeviceCategory } from '../../entities/deviceCategory.entity';

@Injectable()
export class CreateDeviceModelRepository {
  constructor(
    @InjectRepository(DeviceModel)
    private deviceModelRepository: Repository<DeviceModel>,

    @InjectRepository(DeviceCategory)
    private deviceCategoryRepository: Repository<DeviceCategory>,
  ) {}

  createDeviceModel(deviceModel: Partial<DeviceModel>): DeviceModel {
    return this.deviceModelRepository.create(deviceModel);
  }

  async insertDeviceModel(deviceModel: DeviceModel): Promise<DeviceModel> {
    return await this.deviceModelRepository.save(deviceModel);
  }

  async deviceModelExists(slug: string): Promise<boolean> {
    return this.deviceModelRepository.exist({
      where: {
        slug,
      },
    });
  }

  async findDeviceCategoryById(id: string): Promise<DeviceCategory> {
    return this.deviceCategoryRepository.findOne({
      where: {
        uuid: id,
      },
      select: {
        id: true,
      },
    });
  }
}
