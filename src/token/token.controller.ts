import { Controller, Get, Query } from '@nestjs/common';
import { returnLib } from 'src/libs/return.lib';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {

  constructor(
    private readonly tokenService: TokenService,
  ) { }

  @Get()
  async getToken(
    @Query('code') code: string,
  ) {

    const token = await this.tokenService.getToken(code);

    return returnLib(200, '토큰 발급 성공', token);
  }
}