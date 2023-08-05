import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Role } from '../enums/roles.enum';

@Injectable()
export class JwtRepository {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findPermissionsByRole(role: Role): Promise<Permission[]> {
    return await this.permissionRepository.find({
      where: {
        roles: {
          slug: role,
        },
      },
      relations: {
        roles: true,
      },
      cache: true,
    });
  }
}
