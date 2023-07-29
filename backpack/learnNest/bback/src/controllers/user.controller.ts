import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/register')
  public async register() {
    return 'register';
  }

  @Get('/allUsers')
  public async allUsers() {
    return await this.userService.findAll();
  }

  @Get('/findUserById')
  public async findUserById() {
    return await this.userService.findById();
  }
}
