import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserDTO, SignInDTO } from '@trombonix/data-transfer-objects';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  
  @Post('signup')
  async signUp(@Req() req: any, @Body() createUserDTO:  CreateUserDTO) {
    const user = await this.authService.signUp(createUserDTO);
  
    req.session.userId = user.id;
  }

  @Post('signin')
  async signIn(@Req() req: any, @Body() signInDTO: SignInDTO) {
    const user = await this.authService.signIn(signInDTO);

    req.session.userId = user.id;
  }
}
