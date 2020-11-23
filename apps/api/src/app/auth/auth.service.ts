import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO, SignInDTO, UserDTO } from '@trombonix/data-transfer-objects';
import { UsersService } from '../users/shared/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService
  ) {}
  
  async signUp(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return await this.usersService.createUser(createUserDTO);
  }

  async signIn(signInDTO: SignInDTO): Promise<UserDTO> {
    const user = await this.usersService.getUserWithHisPassword({ email: signInDTO.email });
  
    if (!user) {
      throw new BadRequestException('Bad credentials');
    }

    if (user.password !== signInDTO.password) {
      throw new BadRequestException('Bad credentials');
    }

    return user;
  }
}
