import { Injectable } from '@nestjs/common';
import { GetAllDevicesResponse } from './getAllDevices.schema';
import { UserRepository } from 'src/modules/auth/repositories/user.repository';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(user: UserRequest): Promise<GetAllDevicesResponse> {
    const customer = await this.userRepo.findWithDevices(user.id);

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
