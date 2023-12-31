import { z } from 'nestjs-zod/z';
import { Role } from '../enums/roles.enum';

export const jwtPayloadSchema = z.object({
  sub: z.string().uuid(),
  role: z.nativeEnum(Role),
  iat: z.number(),
  exp: z.number(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
