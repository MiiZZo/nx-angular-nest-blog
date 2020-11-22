import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

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
      password: '11197811aS@',
      database: 'nxngnestblog',
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: true,
      logging: 'all',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
