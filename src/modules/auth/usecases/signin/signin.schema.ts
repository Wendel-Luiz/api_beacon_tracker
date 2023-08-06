import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { Role } from '../../enums/roles.enum';

const requestSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
  thumbnail: z.string().url().optional(),
  role: z.nativeEnum(Role).default(Role.Customer),
});

const responseSchema = z.object({
  customer: z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(255),
    email: z.string().email(),
    phone: z.string().min(1).max(255),
    thumbnail: z.string().url().optional(),
    token: z.string(),
  }),
});

export class SigninRequest extends createZodDto(requestSchema) {}
export class SigninResponse extends createZodDto(responseSchema) {}
