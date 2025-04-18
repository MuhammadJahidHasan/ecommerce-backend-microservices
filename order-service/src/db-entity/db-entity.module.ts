import { Module } from '@nestjs/common';
import { DbEntityService, IDbEntityService } from './db-entity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';

const entities: EntityClassOrSchema[] = [OrderEntity, OrderItemEntity];

const providers = [
    {
        provide: IDbEntityService,
        useClass: DbEntityService,
    },
];

@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    providers: providers,
    exports: providers,
})
export class DbEntityModule {}
