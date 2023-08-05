import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const requestSchema = z.object({
  device: z.string().uuid(),
  suername: z.string().min(1).max(255),
  thumbnail: z.string().min(1).max(255),
  color: z.string(),
});

const responseSchema = z.object({
  id: z.string().uuid(),
  device: z.string().uuid(),
  user: z.string().uuid(),
  suername: z.string().min(1).max(255),
  thumbnail: z.string().min(1).max(255),
  color: z.string(),
});

export class AddDeviceRequest extends createZodDto(requestSchema) {}
export class AddDeviceResponse extends createZodDto(responseSchema) {}
