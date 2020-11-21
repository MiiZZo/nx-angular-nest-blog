import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO, UserDTO } from '@trombonix/data-transfer-objects';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserDTO> {
    return await this.usersService.getUser({ id });
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    return await this.usersService.createUser(createUserDto);
  }
}
