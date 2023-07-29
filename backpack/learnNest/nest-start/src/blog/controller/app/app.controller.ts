import { Controller, Get } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { AppService } from 'src/blog/service';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  @ApiProperty({ description: '用戶的名字' })
  getHello(): string {
    return this.appService.getHello();
  }
}
