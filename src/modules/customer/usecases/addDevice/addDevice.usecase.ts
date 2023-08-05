import { Injectable, NotFoundException } from '@nestjs/common';

import { AddDeviceRequest, AddDeviceResponse } from './addDevice.schema';
import { AddDeviceRepository } from './addDevice.repository';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class AddDeviceUseCase {
  constructor(private repo: AddDeviceRepository) {}

  async execute(dto: AddDeviceRequest, user: User): Promise<AddDeviceResponse> {
    const device = await this.repo.findDeviceById(dto.device);
    if (!device) {
      throw new NotFoundException(`Device of id (${dto.device}) not found.`);
    }

    const customerDevice = this.repo.createCustomerDevice({
      ...dto,
      device,
      user,
    });

    const inserted = await this.repo.insertCustomerDevice(customerDevice);

    return {
      id: inserted.uuid,
      user: user.uuid,
      device: device.uuid,
      color: inserted.color,
      suername: inserted.surname,
      thumbnail: inserted.thumbnail,
    };
  }
}
