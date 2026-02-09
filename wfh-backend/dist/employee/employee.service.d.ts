import { RabbitMQService } from '../messaging/rabbitmq.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeeService {
    private readonly rabbitMQService;
    constructor(rabbitMQService: RabbitMQService);
    updateEmployee(id: number, data: UpdateEmployeeDto): Promise<void>;
}
