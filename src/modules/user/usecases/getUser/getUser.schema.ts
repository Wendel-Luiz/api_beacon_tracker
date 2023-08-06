import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const responseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    thumbnail: z.string().url(),
  }),
});

export class GetUserResponse extends createZodDto(responseSchema) {}
