import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const paramSchema = z.object({
  id: z.string().uuid(),
});

const responseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    slug: z.string(),
  }),
);

export class GetDeviceModelByCategoryParam extends createZodDto(paramSchema) {}
export class GetDeviceModelByCategoryResponse extends createZodDto(
  responseSchema,
) {}
