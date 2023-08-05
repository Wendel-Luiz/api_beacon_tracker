import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class UpdateCustomerRepository {
  constructor(
    @InjectRepository(User)
    private customerRepository: Repository<User>,
  ) {}
}
