import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from 'src/shared/shared.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
    imports: [DatabaseModule, SharedModule],
    providers: [CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule {}
