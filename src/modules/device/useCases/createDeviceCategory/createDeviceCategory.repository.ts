import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceCategory } from '../../entities/deviceCategory.entity';

@Injectable()
export class CreateDeviceCategoryRepository {
  constructor(
    @InjectRepository(DeviceCategory)
    private deviceCategoryRepository: Repository<DeviceCategory>,
  ) {}

  createCategory(deviceCategory: Partial<DeviceCategory>): DeviceCategory {
    return this.deviceCategoryRepository.create(deviceCategory);
  }

  async insertCategory(
    deviceCategory: DeviceCategory,
  ): Promise<DeviceCategory> {
    return await this.deviceCategoryRepository.save(deviceCategory);
  }

  async categoryExists(slug: string): Promise<boolean> {
    return this.deviceCategoryRepository.exist({
      where: {
        slug,
      },
    });
  }
}
