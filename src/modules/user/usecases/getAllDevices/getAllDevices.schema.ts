import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const responseSchema = z.object({
  devices: z.array(
    z.object({
      id: z.string().uuid(),
      surname: z.string(),
      thumbnail: z.string(),
      color: z.string(),
      deviceModel: z.string(),
    }),
  ),
});

export class GetAllDevicesResponse extends createZodDto(responseSchema) {}
