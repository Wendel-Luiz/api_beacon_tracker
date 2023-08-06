import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from './usecases/upload/upload.usecase';
import { Permission } from '../auth/enums/permissions.enum';
import { RequirePermissions } from '../auth/decorators/requirePermission.decorator';

@Controller('file')
export class FileController {
  constructor(private uploadFileUseCase: UploadFileUseCase) {}

  @RequirePermissions(Permission.UploadFile)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return await this.uploadFileUseCase.execute(file);
  }
}
