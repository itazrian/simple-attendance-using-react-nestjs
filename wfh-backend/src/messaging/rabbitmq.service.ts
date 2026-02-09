import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { rabbitMqClient } from './rabbitmq.client';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy = rabbitMqClient;

  emitEmployeeUpdated(employeeId: number, updatedFields: any) {
    this.client.emit('EMPLOYEE_UPDATED', {
      employeeId,
      updatedFields,
    });
  }
}