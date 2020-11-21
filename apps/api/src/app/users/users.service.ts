import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, UserDTO } from '@trombonix/data-transfer-objects';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async getUser(creteria: Partial<UserDTO>): Promise<UserDTO> {
    const { password, ...result } = await this.usersRepository.findOne(creteria);

    return result;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const userWithTheSameEmail = await this.getUser({ email: createUserDTO.email });

    if (userWithTheSameEmail) {
      throw new BadRequestException({ message: 'A user with the same email already exists' });
    }

    const _user = this.usersRepository.create(createUserDTO);
    const { password, ...user } = await this.usersRepository.save(_user);

    return user;
  }
}
