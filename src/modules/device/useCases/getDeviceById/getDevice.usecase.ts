import { Injectable, NotFoundException } from '@nestjs/common';
import { GetDeviceByIdParam, GetDeviceByIdResponse } from './getDevice.schema';
import { GetDeviceByIdRepository } from './getDevice.repository';

@Injectable()
export class GetDeviceByIdUseCase {
  constructor(private repo: GetDeviceByIdRepository) {}

  async execute(param: GetDeviceByIdParam): Promise<GetDeviceByIdResponse> {
    const device = await this.repo.findDeviceById(param.id);
    if (!device) {
      throw new NotFoundException(`Device of id (${param.id}) not found.`);
    }

    return {
      id: device.uuid,
      title: device.title,
      code: device.code,
      deviceModel: device.deviceModel?.uuid,
    };
  }
}
