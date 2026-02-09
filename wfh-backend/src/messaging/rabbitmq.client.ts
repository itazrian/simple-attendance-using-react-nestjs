import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const rabbitMqClient = ClientProxyFactory.create({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'employee_queue',
    queueOptions: {
      durable: true,
    },
  },
});