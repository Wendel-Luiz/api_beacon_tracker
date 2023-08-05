import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Device } from './device.entity';

@Entity({ name: 'DeviceReading' })
export class DeviceReading {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'uuid', generated: 'uuid' })
  uuid: string;

  @Column({ name: 'latitude', nullable: true, length: 256 })
  latitude: string;

  @Column({ name: 'longitude', nullable: true, length: 256 })
  longitude: string;

  @Column({ name: 'datetime', nullable: true })
  dateTime: Date;

  @OneToMany(() => Device, (device) => device.deviceReadings)
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
