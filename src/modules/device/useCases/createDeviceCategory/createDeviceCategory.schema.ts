import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const requestSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
});

const responseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
});

export class CreateDeviceCategoryRequest extends createZodDto(requestSchema) {}
export class CreateDeviceCategoryResponse extends createZodDto(
  responseSchema,
) {}
