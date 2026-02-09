import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const allUsers = await this.usersService.findAll();
    const totalUsers = allUsers.length;

    if (!user) {
      return {
        message: 'Email tidak ditemukan',
        error: 'Unauthorized',
        statusCode: 401,
        message_db: 'Database connected & table users found',
        totalUsers,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        message: 'Password salah',
        error: 'Unauthorized',
        statusCode: 401,
        message_db: 'Database connected & table users found',
        totalUsers,
      };
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      message: 'Login berhasil',
      token: this.jwtService.sign(payload),
      role: user.role,
      statusCode: 200,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message_db: 'Database connected & table users found',
      totalUsers,
    };
  }
}
