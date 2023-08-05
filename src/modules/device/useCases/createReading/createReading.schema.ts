import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const paramSchema = z.object({
  id: z.string().uuid(),
});

const requestSchema = z.object({
  longitude: z.string().optional(),
  latitude: z.string().optional(),
  dateTime: z
    .string()
    .datetime()
    .transform((date) => new Date(date))
    .optional(),
});

const responseSchema = z.object({
  id: z.string().uuid(),
  device: z.string().uuid(),
  longitude: z.string(),
  latitude: z.string(),
  dateTime: z.string().datetime(),
});

export class CreateReadingParam extends createZodDto(paramSchema) {}
export class CreateReadingRequest extends createZodDto(requestSchema) {}
export class CreateReadingResponse extends createZodDto(responseSchema) {}
