import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Role } from '../enums/roles.enum';
import { JwtPayload } from '../schemas/jwtPayload.schema';
import { config } from 'src/config/env.config';

@Injectable()
export class JwtLocalService {
  constructor(private jwtService: JwtService) {}

  sign(sub: string, role: Role): string {
    const payload: JwtPayload = {
      sub,
      role,
    };

    const options: JwtSignOptions = {
      secret: config.jwt_secret,
    };

    return this.jwtService.sign(payload, options);
  }

  async validate(token: string): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: config.jwt_secret,
    });
  }
}
