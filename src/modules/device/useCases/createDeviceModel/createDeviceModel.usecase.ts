import { Injectable } from '@nestjs/common';
import {
  CreateDeviceModelRequest,
  CreateDeviceModelResponse,
} from './createDeviceModel.schema';
import { EntityAlreadyExists } from 'src/exceptions/entityAlreadyExists.exception';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { DeviceModelRepository } from '../../repositories/deviceModel.repository';
import { DeviceCategoryRepository } from '../../repositories/deviceCategory.repository';

@Injectable()
export class CreateDeviceModelUseCase {
  constructor(
    private deviceModelRepo: DeviceModelRepository,
    private deviceCategoryRepo: DeviceCategoryRepository,
  ) {}

  async execute(
    dto: CreateDeviceModelRequest,
  ): Promise<CreateDeviceModelResponse> {
    if (await this.deviceModelRepo.exists({ slug: dto.slug })) {
      throw new EntityAlreadyExists(
        `Device Model (${dto.slug}) already exists.`,
      );
    }

    const deviceCategory = await this.deviceCategoryRepo.findById(
      dto.deviceCategory,
    );

    if (!deviceCategory) {
      throw new EntityNotFound(
        `Device category (${dto.deviceCategory}) not found`,
      );
    }

    const deviceModel = this.deviceModelRepo.create({
      ...dto,
      deviceCategory: deviceCategory,
    });

    const inserted = await this.deviceModelRepo.insert(deviceModel);

    return {
      id: inserted.uuid,
      title: inserted.title,
      slug: inserted.slug,
    };
  }
}
