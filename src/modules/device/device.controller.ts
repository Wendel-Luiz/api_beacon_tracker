import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateDeviceUseCase } from './useCases/createDevice/createDevice.usecase';
import { CreateReadingUseCase } from './useCases/createReading/createReading.usecase';
import {
  CreateDeviceRequest,
  CreateDeviceResponse,
} from './useCases/createDevice/createDevice.schema';
import {
  CreateReadingParam,
  CreateReadingRequest,
  CreateReadingResponse,
} from './useCases/createReading/createReading.schema';
import {
  CreateDeviceCategoryRequest,
  CreateDeviceCategoryResponse,
} from './useCases/createDeviceCategory/createDeviceCategory.schema';
import { CreateDeviceCategoryUseCase } from './useCases/createDeviceCategory/createDeviceCategory.usecase';
import {
  CreateDeviceModelRequest,
  CreateDeviceModelResponse,
} from './useCases/createDeviceModel/createDeviceModel.schema';
import { CreateDeviceModelUseCase } from './useCases/createDeviceModel/createDeviceModel.usecase';
import { GetCategoriesResponse } from './useCases/getCategories/getCategories.schema';
import { GetCategoriesUseCase } from './useCases/getCategories/getCategories.usecase';
import {
  GetDeviceByIdParam,
  GetDeviceByIdResponse,
} from './useCases/getDeviceById/getDevice.schema';
import { GetDeviceByIdUseCase } from './useCases/getDeviceById/getDevice.usecase';
import { GetDeviceModelByCategoryUseCase } from './useCases/getModelsByCategory/getModelsByCategory.usecase';
import {
  GetDeviceModelByCategoryParam,
  GetDeviceModelByCategoryResponse,
} from './useCases/getModelsByCategory/getModelsByCategory.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RequirePermissions } from '../auth/decorators/requirePermission.decorator';
import { Permission } from '../auth/enums/permissions.enum';

@Controller('device')
export class DeviceController {
  constructor(
    private createDeviceUseCase: CreateDeviceUseCase,
    private createReadingUseCase: CreateReadingUseCase,
    private createDeviceCategoryUseCase: CreateDeviceCategoryUseCase,
    private createDeviceModelUseCase: CreateDeviceModelUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private getDeviceByIdUseCase: GetDeviceByIdUseCase,
    private getDeviceModelByCategoryUseCase: GetDeviceModelByCategoryUseCase,
  ) {}

  @Post('create-device')
  async createDevice(
    @Body() body: CreateDeviceRequest,
  ): Promise<CreateDeviceResponse> {
    return await this.createDeviceUseCase.execute(body);
  }

  @Post(':id/create-reading')
  async CreateReading(
    @Body() body: CreateReadingRequest,
    @Param() param: CreateReadingParam,
  ): Promise<CreateReadingResponse> {
    return await this.createReadingUseCase.execute(param, body);
  }

  @Post('create-device-category')
  async createDeviceCategory(
    @Body() body: CreateDeviceCategoryRequest,
  ): Promise<CreateDeviceCategoryResponse> {
    return await this.createDeviceCategoryUseCase.execute(body);
  }

  @Post('create-device-model')
  async createDeviceModel(
    @Body() body: CreateDeviceModelRequest,
  ): Promise<CreateDeviceModelResponse> {
    return await this.createDeviceModelUseCase.execute(body);
  }

  @RequirePermissions(Permission.GetCategories)
  @Get('get-categories')
  async getCategories(): Promise<GetCategoriesResponse> {
    return await this.getCategoriesUseCase.execute();
  }

  @Get(':id/get-device')
  async getDeviceById(
    @Param() param: GetDeviceByIdParam,
  ): Promise<GetDeviceByIdResponse> {
    return await this.getDeviceByIdUseCase.execute(param);
  }

  @Get('/get-device-models/device-category/:id')
  async getDeviceModelByCategory(
    @Param() param: GetDeviceModelByCategoryParam,
  ): Promise<GetDeviceModelByCategoryResponse> {
    return await this.getDeviceModelByCategoryUseCase.execute(param);
  }
}
