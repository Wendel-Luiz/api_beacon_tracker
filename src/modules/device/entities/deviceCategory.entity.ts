import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { DeviceModel } from './deviceModel.entity';

@Entity({ name: 'DeviceCategory' })
export class DeviceCategory {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ name: 'slug', length: 256 })
  slug: string;

  @Column({ name: 'title', length: 256 })
  title: string;

  @OneToMany(() => DeviceModel, (deviceModel) => deviceModel.deviceCategory)
  deviceModels: DeviceModel[];

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
