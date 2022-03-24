import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginPayload } from './login.payload';

import { UserService } from '#services/user/user.service';
import { UserEntity } from '#entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: UserEntity) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.id }),
      user,
    };
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmail(payload.email);

    if (!user || !user.comparePassword(payload.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return user;
  }
}
