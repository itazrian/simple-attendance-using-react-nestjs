import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../messaging/rabbitmq.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async updateEmployee(id: number, data: UpdateEmployeeDto) {

    this.rabbitMQService.emitEmployeeUpdated(id, data);
  }
}
