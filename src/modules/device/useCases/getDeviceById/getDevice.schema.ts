import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const paramSchema = z.object({
  id: z.string().uuid(),
});

const responseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  code: z.string(),
  deviceModel: z.string().uuid(),
});

export class GetDeviceByIdParam extends createZodDto(paramSchema) {}
export class GetDeviceByIdResponse extends createZodDto(responseSchema) {}
