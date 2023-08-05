import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const requestSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
  thumbnail: z.string().url(),
});

const responseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().min(1).max(255),
  thumbnail: z.string().url(),
  token: z.string(),
});

export class CreateCustomerRequest extends createZodDto(requestSchema) {}
export class CreateCustomerResponse extends createZodDto(responseSchema) {}
