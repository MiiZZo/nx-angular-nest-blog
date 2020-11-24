import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as Redis from 'ioredis';
import * as connectRedis from 'connect-redis';
import { AppModule } from './app/app.module';

const globalPrefix = 'api';
const IS_PROD = process.env.mode === 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS
  });

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe()
  );

  app.use(session({
    name: process.env.SESSION_NAME,
    store: new RedisStore({
      client: redis,
      disableTouch: true
    }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: 'lax',
      secure: IS_PROD
    },
    resave: false,
    saveUninitialized: false
  }));

  const port = process.env.PORT || 3333;

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
