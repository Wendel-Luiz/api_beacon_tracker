import { ConflictException, Injectable } from '@nestjs/common';
import {
  CreateDeviceCategoryRequest,
  CreateDeviceCategoryResponse,
} from './createDeviceCategory.schema';
import { CreateDeviceCategoryRepository } from './createDeviceCategory.repository';

@Injectable()
export class CreateDeviceCategoryUseCase {
  constructor(private repo: CreateDeviceCategoryRepository) {}

  async execute(
    dto: CreateDeviceCategoryRequest,
  ): Promise<CreateDeviceCategoryResponse> {
    if (await this.repo.categoryExists(dto.slug)) {
      throw new ConflictException(
        `Device category (${dto.slug}) already exists.`,
      );
    }

    const deviceCategory = this.repo.createCategory(dto);
    const inserted = await this.repo.insertCategory(deviceCategory);

    return {
      id: inserted.uuid,
      title: inserted.title,
      slug: inserted.slug,
    };
  }
}
