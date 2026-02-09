import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    MessagingModule,
  ],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}