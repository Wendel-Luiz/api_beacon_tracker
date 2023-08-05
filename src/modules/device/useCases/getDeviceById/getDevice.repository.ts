import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from '../../entities/device.entity';

@Injectable()
export class GetDeviceByIdRepository {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async findDeviceById(id: string): Promise<Device> {
    return await this.deviceRepository.findOne({
      where: {
        uuid: id,
      },
      relations: {
        deviceModel: true,
      },
    });
  }
}
