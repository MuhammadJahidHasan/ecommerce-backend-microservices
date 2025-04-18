import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoggerService } from './logger-service/logger.service';
import { AxiosService } from './http-service/axios.service';
import { AppCacheService } from './cache-service/app-cache.service';

const services = [LoggerService, AxiosService, AppCacheService];

@Module({
    imports: [HttpModule],
    exports: [...services],
    providers: [...services],
})
export class SharedModule {}
