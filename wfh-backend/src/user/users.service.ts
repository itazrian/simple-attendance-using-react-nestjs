import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
      role: dto.role ? (dto.role as UserRole) : UserRole.EMPLOYEE,
    });

    return this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const updateData: Partial<User> = { ...dto } as any;

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.role) {
      updateData.role = dto.role as UserRole;
    }

    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  async updateProfile(
    id: number,
    data: { name?: string; phone?: string; photo?: string; password?: string },
  ) {
    const user = await this.findById(id);
    if (!user) return null;

    if (data.name) user.name = data.name;
    if (data.phone) user.phone = data.phone;
    if (data.photo) user.photo = data.photo;
    if (data.password) user.password = await bcrypt.hash(data.password, 10);

    return this.userRepository.save(user);
  }
}
