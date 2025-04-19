import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_CONFIG, AppConfigSchema, DATA_SOURCE_OPTIONS } from './common/common.config';
import { UtilsModule } from './utils/utils.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [() => ({ ...APP_CONFIG, isGlobal: true })],
            validationSchema: AppConfigSchema,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => DATA_SOURCE_OPTIONS,
        }),
        UtilsModule,
        OrderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
