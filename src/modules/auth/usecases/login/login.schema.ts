import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const requestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(255),
});

const responseSchema = z.object({
  token: z.string(),
});

export class LoginRequest extends createZodDto(requestSchema) {}
export class LoginResponse extends createZodDto(responseSchema) {}
