import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
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

    const passwordsMatched = await compare(signInDTO.password, user.password);

    if (!passwordsMatched) {
      throw new BadRequestException('Bad credentials');
    }

    const { password, ..._user } = user; 

    return _user;
  }
}
