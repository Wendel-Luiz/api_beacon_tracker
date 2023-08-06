import { Injectable } from '@nestjs/common';

import {
  CreateDeviceRequest,
  CreateDeviceResponse,
} from './createDevice.schema';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { DeviceRepository } from '../../repositories/device.repository';
import { DeviceModelRepository } from '../../repositories/deviceModel.repository';

@Injectable()
export class CreateDeviceUseCase {
  constructor(
    private deviceRepo: DeviceRepository,
    private deviceModelRepo: DeviceModelRepository,
  ) {}

  async execute(dto: CreateDeviceRequest): Promise<CreateDeviceResponse> {
    const deviceModel = await this.deviceModelRepo.findById(dto.deviceModel);
    if (!deviceModel) {
      throw new EntityNotFound(
        `Device model of id(${dto.deviceModel}) not found`,
      );
    }

    const device = this.deviceRepo.create({
      ...dto,
      deviceModel,
    });

    const inserted = await this.deviceRepo.insert(device);

    return {
      id: inserted.uuid,
      title: inserted.title,
      code: inserted.code,
      deviceModel: inserted.deviceModel.uuid,
    };
  }
}
