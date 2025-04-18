import { Reflector } from '@nestjs/core';
import * as compression from 'compression';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { VALIDATION_PIPE_OPTIONS } from './common/config/app.config';
import { FormHandlerValidationPipe } from './common/validator/form-handler.validator';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { AxiosService } from './shared/http-service/axios.service';
import { LoggerService } from './shared/logger-service/logger.service';
import { AllExceptionsFilter } from './common/exception/all-exception.filter';

export const setupAPP = async (app: INestApplication) => {
    app.enableCors();
    app.use(compression());
    app.use(morgan('short'));

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(new FormHandlerValidationPipe(VALIDATION_PIPE_OPTIONS));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    app.useGlobalInterceptors(new ResponseInterceptor());

    //automatically be serialized to JSON
    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    const configSvc = app.get(ConfigService);
    const httpSvc = await app.resolve(AxiosService);
    const centralLogger = new LoggerService();
    app.useGlobalFilters(new AllExceptionsFilter(configSvc, centralLogger));

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

    app.setGlobalPrefix('api/');
};
