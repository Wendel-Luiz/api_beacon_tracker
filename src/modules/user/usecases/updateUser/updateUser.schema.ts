import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const requestSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  thumbnail: z.string().optional(),
  phone: z.string().optional(),
});

const responseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string(),
    thumbnail: z.string(),
    phone: z.string(),
  }),
});

export class UpdateUserRequest extends createZodDto(requestSchema) {}
export class UpdateUserResponse extends createZodDto(responseSchema) {}
