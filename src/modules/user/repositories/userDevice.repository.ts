import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDevice } from '../entities/userDevice.entity';

@Injectable()
export class UserDeviceRepository {
  constructor(
    @InjectRepository(UserDevice)
    private userDeviceRepository: Repository<UserDevice>,
  ) {}

  create(userDevice: Partial<UserDevice>): UserDevice {
    return this.userDeviceRepository.create(userDevice);
  }

  async insert(userDevice: UserDevice): Promise<UserDevice> {
    return await this.userDeviceRepository.save(userDevice, {
      reload: true,
    });
  }

  async findById(id: string): Promise<UserDevice> {
    return await this.userDeviceRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async update(userDevice: UserDevice): Promise<UserDevice> {
    return await this.userDeviceRepository.save(userDevice, {
      reload: true,
    });
  }

  async delete(userDevice: UserDevice): Promise<void> {
    await this.userDeviceRepository.softRemove(userDevice);
  }
}
