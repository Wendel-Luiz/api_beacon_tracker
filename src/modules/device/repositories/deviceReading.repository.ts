import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceReading } from '../entities/deviceReading.entity';

@Injectable()
export class DeviceReadingRepository {
  constructor(
    @InjectRepository(DeviceReading)
    private deviceReadingRepository: Repository<DeviceReading>,
  ) {}

  create(deviceReading: Partial<DeviceReading>): DeviceReading {
    return this.deviceReadingRepository.create(deviceReading);
  }

  async insert(deviceReading: DeviceReading): Promise<DeviceReading> {
    return await this.deviceReadingRepository.save(deviceReading, {
      reload: true,
    });
  }

  async findById(id: string): Promise<DeviceReading> {
    return await this.deviceReadingRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async update(customer: DeviceReading): Promise<DeviceReading> {
    return await this.deviceReadingRepository.save(customer, { reload: true });
  }

  async delete(deviceReading: DeviceReading): Promise<void> {
    await this.deviceReadingRepository.softRemove(deviceReading);
  }
}
