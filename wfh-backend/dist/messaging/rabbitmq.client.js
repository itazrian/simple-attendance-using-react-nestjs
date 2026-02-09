"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMqClient = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.rabbitMqClient = microservices_1.ClientProxyFactory.create({
    transport: microservices_1.Transport.RMQ,
    options: {
        urls: ['amqp://localhost:5672'],
        queue: 'employee_queue',
        queueOptions: {
            durable: true,
        },
    },
});
//# sourceMappingURL=rabbitmq.client.js.map