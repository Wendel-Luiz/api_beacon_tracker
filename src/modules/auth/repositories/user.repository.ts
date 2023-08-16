import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: Partial<User>): User {
    return this.userRepository.create(user);
  }

  async insert(user: User): Promise<User> {
    return await this.userRepository.save(user, { reload: true });
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        uuid: id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findWithDevices(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        uuid: id,
      },
      relations: {
        role: true,
        devices: {
          device: {
            deviceModel: true,
          },
        },
      },
    });
  }

  async exists(filter: { email?: string; phone?: string }): Promise<boolean> {
    return await this.userRepository.exist({
      where: [{ email: filter.email }, { phone: filter.phone }],
    });
  }

  async delete(user: User): Promise<void> {
    await this.userRepository.softRemove(user);
  }

  async update(user: User): Promise<User> {
    return await this.userRepository.save(user, {
      reload: true,
    });
  }
}
