import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceModel } from '../../entities/deviceModel.entity';

@Injectable()
export class GetDeviceModelByCategoryRepository {
  constructor(
    @InjectRepository(DeviceModel)
    private deviceModelRepository: Repository<DeviceModel>,
  ) {}

  async findDeviceModelsByCategory(id: string): Promise<DeviceModel[]> {
    return await this.deviceModelRepository.find({
      where: {
        deviceCategory: {
          uuid: id,
        },
      },
      relations: {
        deviceCategory: true,
      },
    });
  }
}
