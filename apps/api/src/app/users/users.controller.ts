import {  Controller, Get, Param } from '@nestjs/common';
import {  UserDTO } from '@trombonix/data-transfer-objects';
import { UsersService } from './shared/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserDTO> {
    return await this.usersService.getUser({ id });
  }
}
