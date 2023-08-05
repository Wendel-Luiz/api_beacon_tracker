import { Injectable, NotFoundException } from '@nestjs/common';
import { RemoveDeviceRepository } from './removeDevice.repository';
import { RemoveDeviceParam, RemoveDeviceResponse } from './removeDevice.schema';
import { UserRequest } from 'src/modules/shared/shemas/user.schema';

@Injectable()
export class RemoveDeviceUseCase {
  constructor(private repo: RemoveDeviceRepository) {}

  async execute(
    param: RemoveDeviceParam,
    user: UserRequest,
  ): Promise<RemoveDeviceResponse> {
    const customer = await this.repo.findCustomerWithDevices(user.id);
    if (!customer) {
      throw new NotFoundException(`user of id (${user.id}) not found.`);
    }

    customer.devices = customer.devices.filter(
      (device) => device.uuid === param.id,
    );

    await this.repo.updateCustomer(customer);

    return {
      message: 'device removed successfully.',
    };
  }
}
