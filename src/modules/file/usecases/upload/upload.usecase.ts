import { Injectable } from '@nestjs/common';
import { UploadResponse } from './upload.schema';

@Injectable()
export class UploadFileUseCase {
  async execute(file: Express.Multer.File): Promise<UploadResponse> {
    return {
      url: 'https://static-00.iconduck.com/assets.00/profile-icon-256x256-ctwdznbo.png',
    };
  }
}
