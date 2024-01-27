import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from 'nestjs-pino';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
        ['http://localhost:3001','http://localhost:3000','https://webui-szl9.onrender.com','https://production-varify-server.onrender.com', 'https://varify.synex.one'],
    credentials: true,
  })

  // Add Pino logger
  app.useLogger(app.get(Logger));

  // Add cookie parser
  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();
