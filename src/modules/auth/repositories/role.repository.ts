import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role as RoleEnum } from '../enums/roles.enum';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(role: Partial<Role>): Role {
    return this.roleRepository.create(role);
  }

  async insert(role: Role): Promise<Role> {
    return await this.roleRepository.save(role, { reload: true });
  }

  async findById(id: string): Promise<Role> {
    return await this.roleRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async findByRoleEnum(role: RoleEnum): Promise<Role> {
    return this.roleRepository.findOne({
      where: {
        slug: role,
      },
    });
  }

  async delete(role: Role): Promise<void> {
    await this.roleRepository.softRemove(role);
  }

  async update(role: Role): Promise<Role> {
    return await this.roleRepository.save(role, {
      reload: true,
    });
  }
}
