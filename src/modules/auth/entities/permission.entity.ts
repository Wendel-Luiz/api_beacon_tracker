import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm';
import { Role } from './role.entity';
import { Permission as PermissionEnum } from '../enums/permissions.enum';

@Entity({ name: 'Permission' })
export class Permission {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ name: 'slug', unique: true, length: 256 })
  slug: PermissionEnum;

  @Column({ name: 'title', length: 256 })
  title: string;

  @Column({ name: 'description', length: 256 })
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];

  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

  @Column({ nullable: true })
  deletedBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
