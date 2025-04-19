import moment from 'moment';
import { IMQService } from '../lib/message-queue/mq';
import config from '../config/config';

export interface IEmailService {
    senEmail(): Promise<any>; 
}

export class EmailService implements IEmailService {

    constructor(
        private readonly mqClient: IMQService,
    ) { }

    public async senEmail() {

        await this.mqClient.consumeFromQueue(config.MESSAGE_QUEUE.RABBITMQ_EMAIL_QUEUE, (msg: string) => {
            console.log(`Log from email service`, msg);
            
        });
    }

}

export const getEmailServiceInstance = async (
    mqClient: IMQService,
): Promise<IEmailService> => {
    return new EmailService(mqClient);
};
