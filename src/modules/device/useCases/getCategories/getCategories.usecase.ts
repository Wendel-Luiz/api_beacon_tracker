import { Injectable } from '@nestjs/common';
import { GetCategoriesResponse } from './getCategories.schema';
import { DeviceCategoryRepository } from '../../repositories/deviceCategory.repository';

@Injectable()
export class GetCategoriesUseCase {
  constructor(private deviceCategoryRepo: DeviceCategoryRepository) {}

  async execute(): Promise<GetCategoriesResponse> {
    const categories = await this.deviceCategoryRepo.findAll();

    return categories.map((category) => ({
      id: category.uuid,
      title: category.title,
      slug: category.slug,
    }));
  }
}
