import { Module } from '@nestjs/common';
import { AxiosService, IHttpRequestService } from './http-service/axios.service';
import { HttpModule } from '@nestjs/axios';
import { RabbitMQService } from './mq-service/rabbitmq.service';
import { IMQService } from './mq-service/mq-service.interface';

const services = [
    {
        provide: IHttpRequestService,
        useClass: AxiosService,
    },

    {
        useClass: RabbitMQService,
        provide: IMQService,
    },
];

@Module({
    imports: [HttpModule.register({})],
    providers: services,
    exports: services,
})
export class SharedModule {}
