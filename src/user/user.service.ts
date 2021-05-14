import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async getInfo(uniqueId: string): Promise<User> {

    const user: User | undefined = await this.userRepository.findOne({
      where: {
        uniqueId,
      },
    });

    if (user === undefined) {

      throw new UnauthorizedException('없는 유저입니다');
    }

    return user;
  }

  async getAllInfo(): Promise<User[]> {

    return this.userRepository.find();
  }
}