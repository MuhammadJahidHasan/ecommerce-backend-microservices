import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { APP_ENV } from './common.constant';
dotenv.config();

export const APP_CONFIG = {
    APP_ENV: process.env.APP_ENV || 'development',
    APP_PORT: parseInt(process.env.APP_PORT || '3000', 10),
    PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL || 'http://localhost:4001/api',
    TYPE_ORM: {
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_PORT,
        USER_NAME: process.env.DB_USERNAME,
        PASSWORD: process.env.DB_PASSWORD,
        DATABASE: process.env.DB_NAME,
        MIGRATIONS_TABLE_NAME: 'migration',
        ENTITIES: [__dirname + '/../db-entity/**/*.entity.{js,ts}'],
        CLI: {
            MIGRATIONS_DIR: 'src/migration',
        },
        SYNCHRONIZE: process.env.IS_SYNCHRONIZE_DB && process.env.IS_SYNCHRONIZE_DB === 'true' ? true : false,
        DEBUG: process.env.DB_DEBUG || false,
    },
    MESSAGE_QUEUE: {
        RABBITMQ_URL: process.env.RABBITMQ_URL!,
        RABBITMQ_EMAIL_QUEUE: process.env.RABBITMQ_EMAIL_QUEUE!,
    },
};

export const AppConfigSchema = Joi.object({
    APP_ENV: Joi.string()
        .valid(...Object.values(APP_ENV))
        .required(),
    APP_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    PRODUCT_SERVICE_URL: Joi.string().required(),
    RABBITMQ_URL: Joi.string().uri().required(),
    RABBITMQ_EMAIL_QUEUE: Joi.string().required(),
});

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
    type: 'mysql',
    host: APP_CONFIG.TYPE_ORM.HOST,
    port: APP_CONFIG.TYPE_ORM.PORT ? (APP_CONFIG.TYPE_ORM.PORT as unknown as number) : 3306,
    username: APP_CONFIG.TYPE_ORM.USER_NAME,
    password: APP_CONFIG.TYPE_ORM.PASSWORD,
    database: APP_CONFIG.TYPE_ORM.DATABASE,
    entities: APP_CONFIG.TYPE_ORM.ENTITIES,
    migrationsTableName: APP_CONFIG.TYPE_ORM.MIGRATIONS_TABLE_NAME,
    migrations: [],
    synchronize: APP_CONFIG.TYPE_ORM.SYNCHRONIZE,
    debug: APP_CONFIG.TYPE_ORM.DEBUG as boolean,
    extra: {
        connectionLimit: 20,
        connectTimeout: 10000, // 10 seconds
    },
};

export const VALIDATION_PIPE_OPTIONS = {
    transform: true,
    whitelist: true,
    disableErrorMessages: false,
    forbidNonWhitelisted: true,
} as const;
