import { API_KEY } from './../config/dotenv';
import { IGeneric } from '../libs/interface/IGeneric';
import { UserDto } from './dto/user.dto';
import { ForbiddenException, GoneException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user';
import { IUser } from 'src/libs/interface/IUser';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ISeasonal } from 'src/libs/interface/ISeasonal';
import { UserNotDto } from './dto/userNot.dto';
import { v4 as uuid } from 'uuid';

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
          Authorization: `Bearer ${API_KEY}`,
        },
      })

      seasonalRes = await axios.get(`https://api2.r6stats.com/public-api/stats/${userDto.userName}/pc/seasonal`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

    } catch (err) {

      throw new GoneException('잘못된 이름입니다');
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
    createUser.wl = Math.floor((genericData.stats.general.wins / (genericData.stats.general.wins + genericData.stats.general.losses)) * 100);
    createUser.wins = genericData.stats.general.wins;
    createUser.losses = genericData.stats.general.losses;
    createUser.kd = (genericData.stats.general.kd).toFixed(2);

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

  async addInfoNot(userDto: UserNotDto): Promise<User> {

    const userInfo: User | undefined = await this.getInfo(userDto.userName);

    if (userInfo !== undefined) {

      throw new ForbiddenException('이미 가입되어 있습니다');
    }

    let genericRes;
    let seasonalRes;

    try {
      genericRes = await axios.get(`https://api2.r6stats.com/public-api/stats/${userDto.userName}/pc/generic`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })

      seasonalRes = await axios.get(`https://api2.r6stats.com/public-api/stats/${userDto.userName}/pc/seasonal`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

    } catch (err) {

      throw new GoneException('잘못된 이름입니다');
    }

    const genericData: IGeneric = genericRes.data;
    const seasonalData: ISeasonal = seasonalRes.data;

    const createUser: User = await this.userRepository.create();

    const uniqueId = uuid();

    createUser.uniqueId = uniqueId;
    createUser.generation = userDto.generation;
    createUser.name = userDto.name;
    createUser.userName = userDto.userName;
    createUser.profileImage = genericData.avatar_url_256;
    createUser.level = genericData.progression.level;
    createUser.rank = seasonalData.seasons.crimson_heist.regions.apac[0].rank_text;
    createUser.rankImage = seasonalData.seasons.crimson_heist.regions.apac[0].rank_image;
    createUser.wl = Math.floor((genericData.stats.general.wins / (genericData.stats.general.wins + genericData.stats.general.losses)) * 100);
    createUser.wins = genericData.stats.general.wins;
    createUser.losses = genericData.stats.general.losses;
    createUser.kd = (genericData.stats.general.kd).toFixed(2);

    await this.userRepository.save(createUser);

    return createUser;
  }

  async getInfoCheck(uniqueId: string): Promise<User> {

    const user: User | undefined = await this.getInfo(uniqueId);

    if (user === undefined) {

      throw new UnauthorizedException('없는 유저입니다');
    }

    return user;
  }

  async getAllInfo(): Promise<User[]> {

    return this.userRepository.find({
      order: {
        createdAt: 'ASC'
      }
    });
  }
}