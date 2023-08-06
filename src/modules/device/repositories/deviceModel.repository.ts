import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceModel } from '../entities/deviceModel.entity';

@Injectable()
export class DeviceModelRepository {
  constructor(
    @InjectRepository(DeviceModel)
    private deviceModelRepository: Repository<DeviceModel>,
  ) {}

  create(deviceModel: Partial<DeviceModel>): DeviceModel {
    return this.deviceModelRepository.create(deviceModel);
  }

  async insert(deviceModel: DeviceModel): Promise<DeviceModel> {
    return await this.deviceModelRepository.save(deviceModel, { reload: true });
  }

  async findById(id: string): Promise<DeviceModel> {
    return await this.deviceModelRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async findManyByCategory(id: string): Promise<DeviceModel[]> {
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

  async exists(param: { slug: string }): Promise<boolean> {
    return await this.deviceModelRepository.exist({
      where: {
        slug: param.slug,
      },
    });
  }

  async update(customer: DeviceModel): Promise<DeviceModel> {
    return await this.deviceModelRepository.save(customer, { reload: true });
  }

  async delete(deviceModel: DeviceModel): Promise<void> {
    await this.deviceModelRepository.softRemove(deviceModel);
  }
}
