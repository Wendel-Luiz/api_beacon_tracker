import { Injectable } from '@nestjs/common';
import { UserRequest } from 'src/modules/shared/shemas/user.schema';
import { GetAllDevicesResponse } from './getAllDevices.schema';
import { GetAllDevicesRepository } from './getAllDevices.repository';

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private repo: GetAllDevicesRepository) {}

  async execute(user: UserRequest): Promise<GetAllDevicesResponse> {
    const customer = await this.repo.findCustomerWithDevices(user.id);

    return {
      devices: customer?.devices?.map((device) => ({
        id: device.uuid,
        surname: device.surname,
        thumbnail: device.thumbnail,
        color: device.color,
        deviceModel: device.device.deviceModel.title,
      })),
    };
  }
}
