import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const responseSchema = z.object({
  url: z.string().url(),
});

export class UploadResponse extends createZodDto(responseSchema) {}
