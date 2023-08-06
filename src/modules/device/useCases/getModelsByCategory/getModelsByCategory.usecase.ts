import { Injectable } from '@nestjs/common';
import {
  GetDeviceModelByCategoryParam,
  GetDeviceModelByCategoryResponse,
} from './getModelsByCategory.schema';
import { DeviceModelRepository } from '../../repositories/deviceModel.repository';

@Injectable()
export class GetDeviceModelByCategoryUseCase {
  constructor(private deviceModelRepo: DeviceModelRepository) {}

  async execute(
    param: GetDeviceModelByCategoryParam,
  ): Promise<GetDeviceModelByCategoryResponse> {
    const deviceModels = await this.deviceModelRepo.findManyByCategory(
      param.id,
    );

    return deviceModels.map((deviceModel) => ({
      id: deviceModel.uuid,
      title: deviceModel.title,
      slug: deviceModel.slug,
    }));
  }
}
