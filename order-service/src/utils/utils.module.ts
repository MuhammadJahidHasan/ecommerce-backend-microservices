import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import Redis from 'ioredis';
import { CacheService } from './cache/cache.service';
import { AxiosService, IHttpRequestService } from './http-service/axios.service';
import { HttpModule } from '@nestjs/axios';

const services = [
    // {
    //     useFactory: (): Redis => {
    //         return new Redis(process.env.REDIS_CON_URL as string);
    //     },
    //     provide: 'REDIS_CLIENT',
    // },

    // {
    //     provide: 'ICacheService',
    //     useClass: CacheService,
    // },
    {
        provide: IHttpRequestService,
        useClass: AxiosService,
    },
];

@Module({
    imports: [HttpModule.register({})],
    providers: services,
    exports: services,
})
export class UtilsModule {}
