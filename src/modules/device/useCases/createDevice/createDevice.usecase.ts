import { Injectable } from '@nestjs/common';

import {
  CreateDeviceRequest,
  CreateDeviceResponse,
} from './createDevice.schema';
import { CreateDeviceRepository } from './createDevice.repository';

@Injectable()
export class CreateDeviceUseCase {
  constructor(private repo: CreateDeviceRepository) {}

  async execute(dto: CreateDeviceRequest): Promise<CreateDeviceResponse> {
    const deviceModel = await this.repo.findDeviceModelById(dto.deviceModel);
    if (!deviceModel) {
      throw new Error(`Device model of id(${dto.deviceModel}) not found.`);
    }

    const device = this.repo.createDevice({
      ...dto,
      deviceModel,
    });

    const inserted = await this.repo.insertDevice(device);

    return {
      id: inserted.uuid,
      title: inserted.title,
      code: inserted.code,
      deviceModel: inserted.deviceModel.uuid,
    };
  }
}
