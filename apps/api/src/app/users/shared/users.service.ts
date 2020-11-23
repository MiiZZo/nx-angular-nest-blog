import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, UserDTO } from '@trombonix/data-transfer-objects';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async getUser(creteria: Partial<UserDTO>): Promise<UserDTO> {
    return await this.usersRepository.findOne(creteria);
  }

  async getUserWithHisPassword(creteria: Partial<UserDTO>): Promise<User> {
    return await this.usersRepository.findOne(creteria, {
      select: ['id', 'name', 'email', 'password']
    });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const userWithTheSameEmail = await this.getUser({ email: createUserDTO.email });

    if (userWithTheSameEmail) {
      throw new BadRequestException('A user with the same email already exists');
    }

    const userWithTheSameName = await this.getUser({ name: createUserDTO.name });

    if (userWithTheSameName) {
      throw new BadRequestException('A user with the same name already exists');
    }

    const user = this.usersRepository.create(createUserDTO);
    const { password, ...result } = await this.usersRepository.save(user);

    return result;
  }
}
