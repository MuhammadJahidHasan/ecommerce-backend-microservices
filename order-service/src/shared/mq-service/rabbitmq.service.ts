import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { IMQService } from './mq-service.interface';
import { APP_CONFIG } from '../../common/common.config';

@Injectable()
export class RabbitMQService implements OnModuleInit, IMQService {
    private channel: amqp.Channel;
    private readonly exchange = 'notifications'; //TODO: make it read from config

    async onModuleInit() {
        const connection = await amqp.connect(APP_CONFIG.MESSAGE_QUEUE.RABBITMQ_URL);
        this.channel = await connection.createChannel();
        await this.channel.assertExchange(this.exchange, 'direct', { durable: true });
        console.log('Connected to RabbitMQ:', this.exchange);
    }

    async publishToQueue(queue: string, message: string) {
        const payload = Buffer.from(message);
        const isBublished = this.channel.publish(this.exchange, queue, payload);
        console.log(`Published with routingKey "${queue}":`, message, isBublished);
    }
}
