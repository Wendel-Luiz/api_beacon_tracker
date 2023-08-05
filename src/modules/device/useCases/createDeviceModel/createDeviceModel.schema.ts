import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const requestSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  deviceCategory: z.string().uuid(),
});

const responseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  deviceCategory: z.string().uuid(),
});

export class CreateDeviceModelRequest extends createZodDto(requestSchema) {}
export class CreateDeviceModelResponse extends createZodDto(responseSchema) {}
