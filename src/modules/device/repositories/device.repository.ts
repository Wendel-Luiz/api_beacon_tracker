import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from '../entities/device.entity';

@Injectable()
export class DeviceRepository {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  create(device: Partial<Device>): Device {
    return this.deviceRepository.create(device);
  }

  async insert(device: Device): Promise<Device> {
    return await this.deviceRepository.save(device, { reload: true });
  }

  async findById(id: string): Promise<Device> {
    return await this.deviceRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async update(customer: Device): Promise<Device> {
    return await this.deviceRepository.save(customer, { reload: true });
  }

  async delete(device: Device): Promise<void> {
    await this.deviceRepository.softRemove(device);
  }
}
