import { NextFunction, Request, Response } from 'express';
import { IEmailService } from '../../service/email';

export interface IEmailController {
    sendEmail(): any;
}

export class EmailController implements IEmailController {
    constructor(private readonly emailService: IEmailService) {
        this.sendEmail = this.sendEmail.bind(this);
    }

    async sendEmail(): Promise<any> {
        await this.emailService.senEmail();
    }
}

export const getEmailControllerInstance = async (emailService: IEmailService): Promise<IEmailController> => {
    return new EmailController(emailService);
};
