import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Role as RoleEnum } from '../enums/roles.enum';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  create(permission: Partial<Permission>): Permission {
    return this.permissionRepository.create(permission);
  }

  async insert(permission: Permission): Promise<Permission> {
    return await this.permissionRepository.save(permission, { reload: true });
  }

  async findById(id: string): Promise<Permission> {
    return await this.permissionRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async findPermissionsByRole(role: RoleEnum): Promise<Permission[]> {
    return await this.permissionRepository.find({
      where: {
        roles: {
          slug: role,
        },
      },
      relations: {
        roles: true,
      },
      cache: 60000,
    });
  }

  async delete(permission: Permission): Promise<void> {
    await this.permissionRepository.softRemove(permission);
  }

  async update(permission: Permission): Promise<Permission> {
    return await this.permissionRepository.save(permission, {
      reload: true,
    });
  }
}
