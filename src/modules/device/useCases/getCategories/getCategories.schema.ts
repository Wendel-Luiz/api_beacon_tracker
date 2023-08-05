import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const responseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    slug: z.string(),
  }),
);

export class GetCategoriesResponse extends createZodDto(responseSchema) {}
