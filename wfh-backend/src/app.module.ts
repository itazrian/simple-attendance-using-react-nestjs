import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceModule } from './attendance/attendance.module';
import { MessagingModule } from './messaging/messaging.module';
import { User } from './user/user.entity';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tes_medela_wfh',
      autoLoadEntities: true,
      entities: [User],
      synchronize: true, 
    }),
    EmployeeModule,
    AttendanceModule,
    MessagingModule,
    AuthModule,  
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}