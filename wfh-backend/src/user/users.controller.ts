import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto, UpdateUserDto } from './dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // HRD only
  @Get()
  @Roles('HRD')
  findAll() {
    return this.usersService.findAll();
  }

  // Tambah user
  @Post()
  @Roles('HRD')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // Update user
  @Put(':id')
  @Roles('HRD')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }
}
