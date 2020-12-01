import { Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { IsAuthorizedGuard } from '../../auth/shared/is-authorized.guard';
import { UsersService } from '../shared/users.service';

@UseGuards(IsAuthorizedGuard)
@Controller('me')
export class MeController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  getMe(@Req() req: any) {
    const userId = req.session.userId;

    return this.usersService.getUser({ id: userId });
  }

  @Put()
  update(@Req() req: any) {
    const userId = req.session.userId;

    this.usersService
  }
}
