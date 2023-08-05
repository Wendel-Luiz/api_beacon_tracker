import { User } from 'src/modules/auth/entities/user.entity';
import { Device } from 'src/modules/device/entities/device.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
@Entity({ name: 'CustomerDevice' })
export class CustomerDevice {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ name: 'surname', length: 256 })
  surname: string;

  @Column({ name: 'thumbnail', length: 256 })
  thumbnail: string;

  @Column({ name: 'color', length: 256 })
  color: string;

  @ManyToOne(() => User, (user) => user.devices)
  user: User;

  @ManyToOne(() => Device, (device) => device.customers)
  device: Device;

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
