import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stratgey';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'WFH_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule, AuthService, JwtStrategy],
})
export class AuthModule {}
