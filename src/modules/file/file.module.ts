import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { UploadFileUseCase } from './usecases/upload/upload.usecase';

@Module({
  controllers: [FileController],
  providers: [UploadFileUseCase],
})
export class FileModule {}
