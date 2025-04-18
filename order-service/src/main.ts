import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { APP_CONFIG } from './common/common.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe());

    app.setGlobalPrefix('api/');
    const PORT = APP_CONFIG.APP_PORT || 4002;
    await app.listen(PORT);
    console.log(`Order service running on http://localhost:${PORT}`);
}
bootstrap();
