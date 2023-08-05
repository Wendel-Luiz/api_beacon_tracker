import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Device } from '../../entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceModel } from '../../entities/deviceModel.entity';

@Injectable()
export class CreateDeviceRepository {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,

    @InjectRepository(DeviceModel)
    private deviceModelRepository: Repository<DeviceModel>,
  ) {}

  createDevice(device: Partial<Device>): Device {
    return this.deviceRepository.create(device);
  }

  async insertDevice(device: Device): Promise<Device> {
    return await this.deviceRepository.save(device);
  }

  async findDeviceModelById(id: string): Promise<DeviceModel> {
    return await this.deviceModelRepository.findOne({
      where: {
        uuid: id,
      },
      select: {
        id: true,
      },
    });
  }
}
