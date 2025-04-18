import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DbEntityModule } from 'src/db-entity/db-entity.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
    imports: [DbEntityModule, UtilsModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
