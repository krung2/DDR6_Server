import { API_KEY } from './../config/dotenv';
import { IGeneric } from '../libs/interface/IGeneric';
import { UserDto } from './dto/user.dto';
import { ForbiddenException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user';
import { IUser } from 'src/libs/interface/IUser';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ISeasonal } from 'src/libs/interface/ISeasonal';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async addInfo(user: IUser, userDto: UserDto): Promise<User> {

    const userInfo: User | undefined = await this.getInfo(user.uniqueId);

    if (userInfo !== undefined) {

      throw new ForbiddenException('이미 가입되어 있습니다');
    }

    let genericRes;
    let seasonalRes;

    try {
      genericRes = await axios.get(`https://api2.r6stats.com/public-api/stats/${userDto.userName}/pc/generic`, {
        headers: {
          Authorization: API_KEY
        },
      });

      seasonalRes = await axios.get(`https://api2.r6stats.com/public-api/stats/${userDto.userName}/pc/seasonal`, {
        headers: {
          Authorization: API_KEY,
        },
      });
    } catch (err) {

      throw new InternalServerErrorException('잘못된 이름입니다');
    }

    const genericData: IGeneric = genericRes.data;
    const seasonalData: ISeasonal = seasonalRes.data;

    const createUser: User = await this.userRepository.create();

    createUser.uniqueId = user.uniqueId;
    createUser.generation = userDto.generation;
    createUser.name = user.name;
    createUser.userName = userDto.userName;
    createUser.profileImage = genericData.avatar_url_256;
    createUser.level = genericData.progression.level;
    createUser.rank = seasonalData.seasons.crimson_heist.regions.apac[0].rank_text;
    createUser.rankImage = seasonalData.seasons.crimson_heist.regions.apac[0].rank_image;
    createUser.wl = genericData.stats.general.wins / (genericData.stats.general.wins + genericData.stats.general.losses);
    createUser.wins = genericData.stats.general.wins;
    createUser.losses = genericData.stats.general.losses;
    createUser.kd = genericData.stats.general.kd;

    await this.userRepository.save(createUser);

    return createUser;
  }

  private async getInfo(uniqueId: string): Promise<User | undefined> {

    const user: User | undefined = await this.userRepository.findOne({
      where: {
        uniqueId,
      },
    });

    return user;
  }

  async getInfoCheck(uniqueId: string): Promise<User> {

    const user: User | undefined = await this.getInfo(uniqueId);

    if (user === undefined) {

      throw new UnauthorizedException('없는 유저입니다');
    }

    return user;
  }

  async getAllInfo(): Promise<User[]> {

    return this.userRepository.find();
  }
}