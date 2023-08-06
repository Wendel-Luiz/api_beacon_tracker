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
import { DeviceModel } from '../entities/deviceModel.entity';
import { DeviceReading } from './deviceReading.entity';
import { UserDevice } from 'src/modules/user/entities/userDevice.entity';

@Entity({ name: 'Device' })
export class Device {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ name: 'title', length: 256 })
  title: string;

  @Column({ name: 'code' })
  code: string;

  @ManyToOne(() => DeviceModel, (deviceModel) => deviceModel.devices)
  deviceModel: DeviceModel;

  @OneToMany(() => DeviceReading, (deviceReading) => deviceReading.device)
  deviceReadings: DeviceReading[];

  @OneToMany(() => UserDevice, (userDevice) => userDevice.device)
  customers: UserDevice[];

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
