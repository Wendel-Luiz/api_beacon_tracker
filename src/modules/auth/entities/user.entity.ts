import { Role } from 'src/modules/auth/entities/role.entity';
import { UserDevice } from 'src/modules/user/entities/userDevice.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ name: 'name', length: 256 })
  name: string;

  @Column({ name: 'email', length: 256 })
  email: string;

  @Column({ name: 'phone', length: 256 })
  phone: string;

  @Column({ name: 'password', length: 256 })
  password: string;

  @Column({ name: 'thumbnail', length: 256 })
  thumbnail: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => UserDevice, (userDevice) => userDevice.user, {
    cascade: ['remove'],
  })
  devices: UserDevice[];

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
