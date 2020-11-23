import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

const shared = [
  UsersModule
];

@Module({
  imports: [...shared],
  exports: [...shared]
})
export class SharedModule {}
