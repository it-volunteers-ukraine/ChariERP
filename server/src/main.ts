import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const port = 4200;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('CheriERP API')
    .setDescription('Rest API Documentation')
    .setVersion('1.0')
    .addTag('CheriERP')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(port || 4200, () =>
    console.log(`Application is running on the port: ${port}`),
  );
}

bootstrap();
