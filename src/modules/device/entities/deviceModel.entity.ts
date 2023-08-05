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
import { DeviceCategory } from './deviceCategory.entity';
import { Device } from './device.entity';

@Entity({ name: 'DeviceModel' })
export class DeviceModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ name: 'slug', length: 256 })
  slug: string;

  @Column({ name: 'title', length: 256 })
  title: string;

  @ManyToOne(
    () => DeviceCategory,
    (deviceCategory) => deviceCategory.deviceModels,
  )
  deviceCategory: DeviceCategory;

  @OneToMany(() => Device, (device) => device.deviceModel)
  devices: Device[];

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
