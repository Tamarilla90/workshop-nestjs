import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');

    const config = new DocumentBuilder()
        .setTitle('User example')
        .setDescription('The user API description')
        .setVersion('1.0')
        .addTag('user')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document);

    await app.listen(3000);
}

bootstrap();
