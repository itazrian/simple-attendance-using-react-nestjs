import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../user/users.service';
import * as mysql from 'mysql2/promise';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    const user = await this.usersService.findById(req.user.sub);

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    return {
      message: 'Profil fetched',
      profile: {
        name: user.name,
        email: user.email,
        position: user.position,
        phone: user.phone,
        photo: user.photo,
      },
    };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req, @Body() body: any) {
    const updated = await this.usersService.updateProfile(req.user.sub, body);

    if (!updated) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password123',
      database: 'wfh_logs',
    });

    await conn.execute(
      'INSERT INTO user_logs (user_id, action) VALUES (?, ?)',
      [
        req.user.sub,
        `Update profile: ${JSON.stringify(body)}`,
      ],
    );

    await conn.end();

    return {
      message: 'Profil berhasil diupdate',
      profile: {
        name: updated.name,
        email: updated.email,
        position: updated.position,
        phone: updated.phone,
        photo: updated.photo,
      },
    };
  }
}
