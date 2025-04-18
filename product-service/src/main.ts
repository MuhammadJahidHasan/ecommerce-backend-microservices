import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { setupAPP } from './setupApp';

async function bootstrap(): Promise<NestExpressApplication> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
    await setupAPP(app);
    const configSvc = app.get(ConfigService);
    const PORT = configSvc.get<number>('APP_PORT') || 3000;
    await app.listen(PORT);
    console.log(`Product service on http://localhost:${PORT}`);
    return app;
}
void bootstrap();
