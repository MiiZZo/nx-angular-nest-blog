import {  Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import {  UserDTO } from '@trombonix/data-transfer-objects';
import { UsersService } from './shared/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserDTO> {
    return await this.usersService.getUser({ id });
  }
}
