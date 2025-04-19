import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import { initializeRabbitMQ } from './lib/message-queue/rabbit-mq';
import { globalErrorHandler } from './web/middleware/global-error-handler';
import { getEmailControllerInstance } from './web/controller/email';
import { getEmailServiceInstance } from './service/email';
import { NextFunction, Request, Response } from 'express';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
    const mqClient = await initializeRabbitMQ(config.MESSAGE_QUEUE.RABBITMQ_URL);;

    // Initialize Service
    const flightService = await getEmailServiceInstance(mqClient);

    // Initialize Controller
    const emailController = await getEmailControllerInstance(flightService);
    await emailController.sendEmail();

    app.use(globalErrorHandler);

    process.on('uncaughtException', (err) => {
        console.log(`Error from uncaught exception`, err);
    });
})();

export default app;
