import { Injectable } from '@nestjs/common';

import { AddDeviceRequest, AddDeviceResponse } from './addDevice.schema';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { DeviceRepository } from 'src/modules/device/repositories/device.repository';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { UserDeviceRepository } from '../../repositories/userDevice.repository';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Injectable()
export class AddDeviceUseCase {
  constructor(
    private userRepo: UserRepository,
    private userDeviceRepo: UserDeviceRepository,
    private deviceRepo: DeviceRepository,
  ) {}

  async execute(
    dto: AddDeviceRequest,
    userRequest: UserRequest,
  ): Promise<AddDeviceResponse> {
    const device = await this.deviceRepo.findById(dto.device);
    if (!device) {
      throw new EntityNotFound(`Device of id (${dto.device}) not found`);
    }

    const user = await this.userRepo.findById(userRequest.id);
    if (!user) {
      throw new EntityNotFound(`Customer of id (${dto.device}) not found`);
    }

    const customerDevice = this.userDeviceRepo.create({
      ...dto,
      device,
      user: user,
    });

    const inserted = await this.userDeviceRepo.insert(customerDevice);

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
