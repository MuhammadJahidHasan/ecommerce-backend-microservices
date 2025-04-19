import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'product_id' })
    productId: number;

    @Column({ name: 'order_id' })
    orderId: number;

    @Column({ name: 'product_name', nullable: true })
    productName: string;

    @Column({ name: 'sku', nullable: true })
    sku: string;

    @Column({ name: 'quantity' })
    quantity: number;

    @Column({ name: 'price', type: 'double', precision: 12, scale: 2 })
    price: number;

    @Column({ name: 'total', type: 'double', precision: 12, scale: 2 })
    total: number;

    @ManyToOne(() => OrderEntity, (order) => order.items)
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;
}
