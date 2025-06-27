import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Chari ERP server API' as string)
    .setDescription('General API of the back-end part of the project')
    .setVersion('1.0.0')
    .addGlobalResponse({
      status: 500,
      description: 'Internal Server Error',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
