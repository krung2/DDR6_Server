import User from 'src/entities/user';
import { returnLib } from './../libs/return.lib';
import { UserService } from './user.service';
import { Body, Controller, Get, Query } from '@nestjs/common';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('')
  async getInfo(
    @Query('uniqueId') uniqueId: string,
  ) {

    const data: User = await this.userService.getInfo(uniqueId);

    return returnLib(200, '정보 가져오기 성공!', data);
  }

  @Get('/all')
  async getAllInfo() {

    const data: User[] = await this.userService.getAllInfo();

    return returnLib(200, '모든 정보 가져오기 성공', data);
  }
}