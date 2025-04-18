import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DbEntityService, IDbEntityService } from './database-entity.service';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';

const entities: EntityClassOrSchema[] = [Product, Category, SubCategory];

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
export class DatabaseModule {}
