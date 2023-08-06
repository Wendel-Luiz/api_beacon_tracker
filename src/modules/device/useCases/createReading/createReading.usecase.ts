import { Injectable } from '@nestjs/common';
import {
  CreateReadingParam,
  CreateReadingRequest,
  CreateReadingResponse,
} from './createReading.schema';
import { EntityNotFound } from 'src/exceptions/entityNotFound.exception';
import { DeviceReadingRepository } from '../../repositories/deviceReading.repository';
import { DeviceRepository } from '../../repositories/device.repository';

@Injectable()
export class CreateReadingUseCase {
  constructor(
    private deviceReadingRepo: DeviceReadingRepository,
    private deviceRepo: DeviceRepository,
  ) {}

  async execute(
    param: CreateReadingParam,
    dto: CreateReadingRequest,
  ): Promise<CreateReadingResponse> {
    const device = await this.deviceRepo.findById(param.id);
    if (!device) {
      throw new EntityNotFound(`Device of id(${param.id}) not found`);
    }

    const deviceReading = this.deviceReadingRepo.create({
      ...dto,
      device,
    });

    const inserted = await this.deviceReadingRepo.insert(deviceReading);

    return {
      id: inserted.uuid,
      latitude: inserted.latitude,
      longitude: inserted.longitude,
      dateTime: inserted.dateTime.toISOString(),
      device: device.uuid,
    };
  }
}
