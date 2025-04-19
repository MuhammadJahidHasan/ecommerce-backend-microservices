import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { IOrder, IOrderItem } from '../order/order.interface';
import { OrderItemEntity } from './entities/order-item.entity';

// Use abstract class instead of an interface so that inject from service Without @Inject() syntax
export abstract class IDbEntityService {
    abstract createOrderTransaction(orderData: Partial<IOrder>, orderItemData: Partial<IOrderItem>[]): Promise<IOrder>;
}

@Injectable()
export class DbEntityService implements IDbEntityService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepo: Repository<IOrder>,

        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepo: Repository<IOrderItem>,

        private readonly dataSource: DataSource,
    ) {}

    async createOrderTransaction(orderData: Partial<IOrder>, orderItemData: Partial<IOrderItem>[]): Promise<IOrder> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const history = await queryRunner.manager.save(OrderEntity, orderData as IOrder);

            await queryRunner.manager.save(
                OrderItemEntity,
                orderItemData.map((data: IOrderItem) => {
                    return {
                        ...data,
                        orderId: history.id,
                    };
                }),
            );

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return history;
        } catch (error) {
            console.log(`Error form ordering transaction`, error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw error;
        }
    }
}
