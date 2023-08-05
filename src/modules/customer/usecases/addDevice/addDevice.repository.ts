import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDevice } from '../../entities/customerDevice.entity';
import { Device } from 'src/modules/device/entities/device.entity';

@Injectable()
export class AddDeviceRepository {
  constructor(
    @InjectRepository(CustomerDevice)
    private customerDeviceRepository: Repository<CustomerDevice>,

    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  createCustomerDevice(
    customerDevice: Partial<CustomerDevice>,
  ): CustomerDevice {
    return this.customerDeviceRepository.create(customerDevice);
  }

  async insertCustomerDevice(
    customerDevice: CustomerDevice,
  ): Promise<CustomerDevice> {
    return await this.customerDeviceRepository.save(customerDevice);
  }

  async findDeviceById(id: string): Promise<Device> {
    return await this.deviceRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }
}
