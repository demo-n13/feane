/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // Foydalanuvchini topish
    const user = await this.userService.findOne(username);
    // Foydalanuvchi mavjudligini va parol mosligini tekshirish
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }; // Agar `userId` emas, `id` bo'lsa o'zgartiring
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
