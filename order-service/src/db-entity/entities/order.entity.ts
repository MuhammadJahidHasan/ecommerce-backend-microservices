import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { ORDER_STATUS, PAYMENT_STATUS } from 'src/order/order.constant';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({
        name: 'order_status',
        type: 'enum',
        enum: ORDER_STATUS,
        default: ORDER_STATUS.PENDING,
    })
    orderStatus: ORDER_STATUS;

    @Column({
        name: 'total_amount',
        type: 'double',
        precision: 12,
        scale: 2,
    })
    totalAmount: number;

    @Column({ name: 'gateway', type: 'varchar' })
    gateway: string;

    @Column({ name: 'gateway_currency', type: 'varchar' })
    gatewayCurrency: string;

    @Column({
        name: 'gateway_amount',
        type: 'double',
        precision: 12,
        scale: 2,
    })
    gatewayAmount: number;

    @Column({
        name: 'payment_status',
        type: 'enum',
        enum: PAYMENT_STATUS,
        default: PAYMENT_STATUS.PAID,
    })
    paymentStatus: PAYMENT_STATUS;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'shipping_address', type: 'text' })
    shippingAddress: string;

    @OneToMany(() => OrderItemEntity, (item) => item.order)
    items: OrderItemEntity[];
}
