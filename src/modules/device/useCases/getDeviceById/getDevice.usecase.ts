import { Injectable } from '@nestjs/common';
import { GetDeviceByIdParam, GetDeviceByIdResponse } from './getDevice.schema';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { DeviceRepository } from '../../repositories/device.repository';

@Injectable()
export class GetDeviceByIdUseCase {
  constructor(private deviceRepo: DeviceRepository) {}

  async execute(param: GetDeviceByIdParam): Promise<GetDeviceByIdResponse> {
    const device = await this.deviceRepo.findById(param.id);
    if (!device) {
      throw new EntityNotFound(`Device of id (${param.id}) not found`);
    }

    return {
      id: device.uuid,
      title: device.title,
      code: device.code,
      deviceModel: device.deviceModel?.uuid,
    };
  }
}
