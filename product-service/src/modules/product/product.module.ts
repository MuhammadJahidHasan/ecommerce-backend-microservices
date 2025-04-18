import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [DatabaseModule, SharedModule],
    providers: [ProductService],
    controllers: [ProductController],
})
export class ProductModule {}
