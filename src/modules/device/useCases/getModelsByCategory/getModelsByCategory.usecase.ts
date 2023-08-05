import { Injectable } from '@nestjs/common';
import {
  GetDeviceModelByCategoryParam,
  GetDeviceModelByCategoryResponse,
} from './getModelsByCategory.schema';
import { GetDeviceModelByCategoryRepository } from './getModelsByCategory.repository';

@Injectable()
export class GetDeviceModelByCategoryUseCase {
  constructor(private repo: GetDeviceModelByCategoryRepository) {}

  async execute(
    param: GetDeviceModelByCategoryParam,
  ): Promise<GetDeviceModelByCategoryResponse> {
    const deviceModels = await this.repo.findDeviceModelsByCategory(param.id);

    return deviceModels.map((deviceModel) => ({
      id: deviceModel.uuid,
      title: deviceModel.title,
      slug: deviceModel.slug,
    }));
  }
}
