import { Injectable } from '@nestjs/common';
import {
  CreateReadingParam,
  CreateReadingRequest,
  CreateReadingResponse,
} from './createReading.schema';
import { CreateReadingRepository } from './createReading.repository';

@Injectable()
export class CreateReadingUseCase {
  constructor(private repo: CreateReadingRepository) {}

  async execute(
    param: CreateReadingParam,
    dto: CreateReadingRequest,
  ): Promise<CreateReadingResponse> {
    const device = await this.repo.findDeviceById(param.id);
    if (!device) {
      throw new Error(`Device of id(${param.id}) not found.`);
    }

    const deviceReading = this.repo.createReading({
      ...dto,
      device,
    });

    const inserted = await this.repo.insertReading(deviceReading);

    return {
      id: inserted.uuid,
      latitude: inserted.latitude,
      longitude: inserted.longitude,
      dateTime: inserted.dateTime.toISOString(),
      device: device.uuid,
    };
  }
}
