import { Body, Controller, Param, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/blog/dto/login-user-dto';
import { UserService } from 'src/blog/service';

@Controller('login')
export class LoginController {
  constructor(private userService: UserService) {}
  @Post('')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    console.log(email, password);

    const result = await this.userService.findOne(email, password);
    console.log(result);
    return 'ok';
  }
}
