import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/blog/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findOne(email: string, password: string): Promise<User> {
    return this.userRepository.findOneBy({ email, password });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
