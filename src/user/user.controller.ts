import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Token } from './../libs/decorator/token.decorator';
import { UserDto } from './dto/user.dto';
import User from 'src/entities/user';
import { returnLib } from './../libs/return.lib';
import { UserService } from './user.service';
import AuthGaurd from 'src/middleware/auth.middleware';
import { IUser } from 'src/libs/interface/IUser';
import { UserNotDto } from './dto/userNot.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  @UseGuards(new AuthGaurd())
  async addInfo(
    @Token() tokenUser: IUser,
    @Body() userDto: UserDto,
  ) {

    const user: User = await this.userService.addInfo(tokenUser, userDto);

    return returnLib(201, '등록 성공', user);
  }

  @Post('not')
  @UseGuards(new AuthGaurd())
  async addInfoNot(
    @Body() userDto: UserNotDto,
  ) {

    const user: User = await this.userService.addInfoNot(userDto);

    return returnLib(201, '등록 성공', user);
  }

  @Get()
  async getInfo(
    @Query('uniqueId') uniqueId: string,
  ) {

    const data: User = await this.userService.getInfoCheck(uniqueId);

    return returnLib(200, '정보 가져오기 성공!', data);
  }

  @Get('/all')
  async getAllInfo() {

    const data: User[] = await this.userService.getAllInfo();

    return returnLib(200, '모든 정보 가져오기 성공', data);
  }
}