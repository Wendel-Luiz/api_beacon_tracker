import { Injectable } from '@nestjs/common';
import { RemoveDeviceParam, RemoveDeviceResponse } from './removeDevice.schema';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Injectable()
export class RemoveDeviceUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(
    param: RemoveDeviceParam,
    user: UserRequest,
  ): Promise<RemoveDeviceResponse> {
    const customer = await this.userRepo.findWithDevices(user.id);
    if (!customer) {
      throw new EntityNotFound(`user of id (${user.id}) not found`);
    }

    customer.devices = customer.devices.filter(
      (device) => device.uuid === param.id,
    );

    await this.userRepo.update(customer);

    return {
      message: 'device removed successfully',
    };
  }
}
