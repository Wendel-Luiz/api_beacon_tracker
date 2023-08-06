import { z } from 'nestjs-zod/z';

export const errorSchema = z.object({
  type: z.string(),
  message: z.string(),
  refCode: z.string(),
});
export type Error = z.infer<typeof errorSchema>;

export const responseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  path: z.string(),
  errors: z.array(errorSchema).optional(),
});
export type Response = z.infer<typeof responseSchema>;
