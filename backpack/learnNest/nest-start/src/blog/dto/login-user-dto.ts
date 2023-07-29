import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: '邮箱' })
  readonly email: string;
  @ApiProperty({ description: '密码' })
  readonly password: string;
}
