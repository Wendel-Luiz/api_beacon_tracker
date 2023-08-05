import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeviceModelRepository } from './createDeviceModel.repository';
import {
  CreateDeviceModelRequest,
  CreateDeviceModelResponse,
} from './createDeviceModel.schema';

@Injectable()
export class CreateDeviceModelUseCase {
  constructor(private repo: CreateDeviceModelRepository) {}

  async execute(
    dto: CreateDeviceModelRequest,
  ): Promise<CreateDeviceModelResponse> {
    if (await this.repo.deviceModelExists(dto.slug)) {
      throw new ConflictException(`Device Model (${dto.slug}) already exists.`);
    }

    const deviceCategory = await this.repo.findDeviceCategoryById(
      dto.deviceCategory,
    );

    if (!deviceCategory) {
      throw new NotFoundException(
        `Device category (${dto.deviceCategory} not found.)`,
      );
    }

    const deviceModel = this.repo.createDeviceModel({
      ...dto,
      deviceCategory: deviceCategory,
    });

    const inserted = await this.repo.insertDeviceModel(deviceModel);

    return {
      id: inserted.uuid,
      title: inserted.title,
      slug: inserted.slug,
    };
  }
}
