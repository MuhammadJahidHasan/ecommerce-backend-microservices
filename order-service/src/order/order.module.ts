import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DbEntityModule } from 'src/db-entity/db-entity.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [DbEntityModule, SharedModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
