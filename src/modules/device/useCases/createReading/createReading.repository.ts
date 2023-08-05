import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceReading } from '../../entities/deviceReading.entity';
import { Device } from '../../entities/device.entity';

@Injectable()
export class CreateReadingRepository {
  constructor(
    @InjectRepository(DeviceReading)
    private deviceReadingRepository: Repository<DeviceReading>,

    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  createReading(device: Partial<DeviceReading>): DeviceReading {
    return this.deviceReadingRepository.create(device);
  }

  async insertReading(deviceReading: DeviceReading): Promise<DeviceReading> {
    return await this.deviceReadingRepository.save(deviceReading, {
      reload: true,
    });
  }

  async findDeviceById(id: string): Promise<Device> {
    return await this.deviceRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }
}
