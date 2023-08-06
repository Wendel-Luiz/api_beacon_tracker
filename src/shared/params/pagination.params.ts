import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const paginationSchema = z.object({
  count: z.number(),
  page: z.number(),
});

export class PaginationParams extends createZodDto(paginationSchema) {}
