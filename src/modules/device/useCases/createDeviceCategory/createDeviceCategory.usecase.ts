import { Injectable } from '@nestjs/common';
import {
  CreateDeviceCategoryRequest,
  CreateDeviceCategoryResponse,
} from './createDeviceCategory.schema';
import { EntityAlreadyExists } from 'src/exceptions/entityAlreadyExists.exception';
import { DeviceCategoryRepository } from '../../repositories/deviceCategory.repository';

@Injectable()
export class CreateDeviceCategoryUseCase {
  constructor(private deviceCategoryRepo: DeviceCategoryRepository) {}

  async execute(
    dto: CreateDeviceCategoryRequest,
  ): Promise<CreateDeviceCategoryResponse> {
    if (await this.deviceCategoryRepo.exists({ slug: dto.slug })) {
      throw new EntityAlreadyExists(
        `Device category (${dto.slug}) already exists`,
      );
    }

    const deviceCategory = this.deviceCategoryRepo.create(dto);
    const inserted = await this.deviceCategoryRepo.insert(deviceCategory);

    return {
      id: inserted.uuid,
      title: inserted.title,
      slug: inserted.slug,
    };
  }
}
