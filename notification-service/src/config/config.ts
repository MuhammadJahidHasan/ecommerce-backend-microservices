import * as dotenv from "dotenv";
import Joi from "joi";
import { APP_ENV } from "../constant/common.constant";

dotenv.config();

interface RabbitMQConfig {
    RABBITMQ_URL: string;
    RABBITMQ_EMAIL_QUEUE: string;
}

interface Config {
    APP_ENV: string,
    MESSAGE_QUEUE: RabbitMQConfig;
    APPLICATION_SERVER_PORT: number;
    APP_FORCE_SHUTDOWN_SECOND: number;
    EMAIL_CLIENT_TOKEN: string;
}

const config: Config = {

    APP_ENV: process.env.APP_ENV!,
    MESSAGE_QUEUE: {
        RABBITMQ_URL: process.env.RABBITMQ_URL!,
        RABBITMQ_EMAIL_QUEUE: process.env.RABBITMQ_EMAIL_QUEUE!,
    },
    APPLICATION_SERVER_PORT: Number(process.env.PORT)!,
    APP_FORCE_SHUTDOWN_SECOND: Number(process.env.APP_FORCE_SHUTDOWN_SECOND)!,
    EMAIL_CLIENT_TOKEN: process.env.EMAIL_CLIENT_TOKEN!,
};

const configSchema = Joi.object({
    APP_ENV: Joi.string().valid(...Object.values(APP_ENV)).required(),
    MESSAGE_QUEUE: Joi.object({
        RABBITMQ_URL: Joi.string().uri().required(),
        RABBITMQ_EMAIL_QUEUE: Joi.string().required(),
    }).required(),
    APPLICATION_SERVER_PORT: Joi.number().port().required(),
    APP_FORCE_SHUTDOWN_SECOND: Joi.number().integer().positive().required(),
    EMAIL_CLIENT_TOKEN: Joi.string().required(),
});

const { error } = configSchema.validate(config);

if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
}

export default config;
