import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as dotenv from 'dotenv';
import {useContainer} from 'class-validator';
import {ValidationPipe} from '@nestjs/common';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    useContainer(app.select(AppModule), {fallbackOnErrors: true});
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
