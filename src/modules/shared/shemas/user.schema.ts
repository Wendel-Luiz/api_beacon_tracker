import { Role } from 'src/modules/auth/enums/roles.enum';
import { z } from 'zod';

export const userRequestSchema = z.object({
  id: z.string().uuid(),
  role: z.nativeEnum(Role),
});

export type UserRequest = z.infer<typeof userRequestSchema>;
