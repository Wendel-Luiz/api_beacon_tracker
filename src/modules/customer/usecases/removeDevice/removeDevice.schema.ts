import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const paramSchema = z.object({
  id: z.string(),
});

const responseSchema = z.object({
  message: z.string(),
});

export class RemoveDeviceParam extends createZodDto(paramSchema) {}
export class RemoveDeviceResponse extends createZodDto(responseSchema) {}
