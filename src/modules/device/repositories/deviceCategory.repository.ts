import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceCategory } from '../entities/deviceCategory.entity';

@Injectable()
export class DeviceCategoryRepository {
  constructor(
    @InjectRepository(DeviceCategory)
    private deviceCategoryRepository: Repository<DeviceCategory>,
  ) {}

  create(deviceCategory: Partial<DeviceCategory>): DeviceCategory {
    return this.deviceCategoryRepository.create(deviceCategory);
  }

  async insert(deviceCategory: DeviceCategory): Promise<DeviceCategory> {
    return await this.deviceCategoryRepository.save(deviceCategory, {
      reload: true,
    });
  }

  async findById(id: string): Promise<DeviceCategory> {
    return await this.deviceCategoryRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async findAll(): Promise<DeviceCategory[]> {
    return await this.deviceCategoryRepository.find();
  }

  async exists(param: { slug: string }): Promise<boolean> {
    return await this.deviceCategoryRepository.exist({
      where: {
        slug: param.slug,
      },
    });
  }

  async update(customer: DeviceCategory): Promise<DeviceCategory> {
    return await this.deviceCategoryRepository.save(customer, { reload: true });
  }

  async delete(deviceCategory: DeviceCategory): Promise<void> {
    await this.deviceCategoryRepository.softRemove(deviceCategory);
  }
}
