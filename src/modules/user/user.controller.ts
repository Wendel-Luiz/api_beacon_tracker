import { Body, Controller, Get, Patch, Delete } from '@nestjs/common';

import { GetUserResponse } from './usecases/getUser/getUser.schema';
import { GetUserUseCase } from './usecases/getUser/getUser.usecase';
import { RequirePermissions } from '../auth/decorators/requirePermission.decorator';
import { Permission } from '../auth/enums/permissions.enum';
import {
  UpdateUserRequest,
  UpdateUserResponse,
} from './usecases/updateUser/updateUser.schema';
import { UpdateUserUseCase } from './usecases/updateUser/updateUser.usecase';
import { DeleteUserUseCase } from './usecases/deleteUser/deleteUser.usecase';
import { User } from '../auth/decorators/user.decorator';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @RequirePermissions(Permission.GetUser)
  @Get()
  async getUser(@User() user: UserRequest): Promise<GetUserResponse> {
    return await this.getUserUseCase.execute(user);
  }

  @RequirePermissions(Permission.UpdateUser)
  @Patch()
  async updateUser(
    @Body() dto: UpdateUserRequest,
    @User() user: UserRequest,
  ): Promise<UpdateUserResponse> {
    return await this.updateUserUseCase.execute(dto, user);
  }

  @RequirePermissions(Permission.DeleteUser)
  @Delete()
  async deleteUser(@User() user: UserRequest): Promise<void> {
    return await this.deleteUserUseCase.execute(user);
  }
}
