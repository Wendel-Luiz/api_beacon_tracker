import { Injectable } from '@nestjs/common';
import { GetCategoriesResponse } from './getCategories.schema';
import { GetCategoriesRepository } from './getCategories.repository';

@Injectable()
export class GetCategoriesUseCase {
  constructor(private repo: GetCategoriesRepository) {}

  async execute(): Promise<GetCategoriesResponse> {
    const categories = await this.repo.findAllCategories();

    return categories.map((category) => ({
      id: category.uuid,
      title: category.title,
      slug: category.slug,
    }));
  }
}
