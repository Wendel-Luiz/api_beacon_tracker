import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const requestSchema = z.object({
  title: z.string().min(1).max(256),
  code: z.string().min(1).max(256),
  deviceModel: z.string().uuid(),
});

const responseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  code: z.string(),
  deviceModel: z.string().uuid(),
});

export class CreateDeviceRequest extends createZodDto(requestSchema) {}
export class CreateDeviceResponse extends createZodDto(responseSchema) {}
