import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const requestSchema = z.object({
  id: z.string(),
});

const responseSchema = z.object({
  message: z.string(),
});

export class UpdateCustomerRequest extends createZodDto(requestSchema) {}
export class UpdateCustomerResponse extends createZodDto(responseSchema) {}
