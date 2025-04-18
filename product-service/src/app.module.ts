import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigSchema, APP_CONFIG, DATA_SOURCE_OPTIONS } from './common/config/app.config';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [() => ({ ...APP_CONFIG, isGlobal: true })],
            validationSchema: AppConfigSchema,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => DATA_SOURCE_OPTIONS,
        }),
        SharedModule,
        ProductModule,
        CategoryModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
