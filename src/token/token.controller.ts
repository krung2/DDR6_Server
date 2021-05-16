import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { returnLib } from 'src/libs/return.lib';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {

  constructor(
    private readonly tokenService: TokenService,
  ) { }

  @Get()
  async getToken(
    @Query('code') code?: string,
  ) {

    if (code === undefined) {

      throw new BadRequestException('code가 전송되지 않았습니다');
    }

    const token = await this.tokenService.getToken(code);

    return returnLib(200, '토큰 발급 성공', token);
  }
}