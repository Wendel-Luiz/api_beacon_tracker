import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const paramSchema = z.object({
  id: z.string().uuid(),
});

const responseSchema = z.object({
  message: z.string(),
});

export class DeleteCustomerParam extends createZodDto(paramSchema) {}
export class DeleteCustomerResponse extends createZodDto(responseSchema) {}
