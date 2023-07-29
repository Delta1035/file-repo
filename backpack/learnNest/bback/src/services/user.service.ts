import { Injectable } from '@nestjs/common';
import { Repository, InjectRepository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    console.log('UserService start');
  }

  async findAll(): Promise<User[]> {
    const user = await this.userRepository.find();
    console.log('service 1', user);
    return user;
  }

  async findById(): Promise<User[]> {
    const user = await this.userRepository.findByIds([1]);
    console.log('service 2', user);
    return user;
  }
}
