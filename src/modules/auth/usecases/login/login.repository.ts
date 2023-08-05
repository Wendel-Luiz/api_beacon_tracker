import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class LoginRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      relations: {
        role: {
          permissions: true,
        },
      },
    });
  }
}
