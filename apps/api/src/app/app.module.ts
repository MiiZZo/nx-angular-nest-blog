import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { join } from 'path'

import { AppController } from './app.controller'
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: true,
      logging: 'all',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
