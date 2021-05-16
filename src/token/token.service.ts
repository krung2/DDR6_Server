import { ForbiddenException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { CLIENT, SERVER } from 'src/config/dotenv';

@Injectable()
export class TokenService {

  async getToken(code: string): Promise<string> {

    const tokenData = {
      code,
      clientId: CLIENT.ID,
      clientSecret: CLIENT.SECRET,
    };

    try {

      const { data } = await axios.post(`${SERVER.DAUTH}/token`, tokenData);

      return data.data;
    } catch (err) {

      if (err.response !== undefined) {
        switch (err.response.status) {
          case 401:
            throw new UnauthorizedException('잘못된 clientSecret입니다');
          case 403:
            throw new ForbiddenException('변조된 code입니다');
          default:
            Logger.error(err);
            throw new InternalServerErrorException('Dauth서버 오류');
        }
      }
    }
  }
}
