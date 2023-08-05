import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceCategory } from '../../entities/deviceCategory.entity';

@Injectable()
export class GetCategoriesRepository {
  constructor(
    @InjectRepository(DeviceCategory)
    private deviceCategoryRepository: Repository<DeviceCategory>,
  ) {}

  async findAllCategories(): Promise<DeviceCategory[]> {
    return await this.deviceCategoryRepository.find();
  }
}
