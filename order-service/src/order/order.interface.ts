import { ORDER_STATUS, PAYMENT_STATUS } from './order.constant';

export interface IOrder {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    orderStatus: ORDER_STATUS;
    totalAmount: number;
    gateway: string;
    gatewayCurrency: string;
    gatewayAmount: number;
    paymentStatus: PAYMENT_STATUS;
    shippingAddress: string;
    items: IOrderItem[];
}

export interface IOrderItem {
    id: number;
    productId: number;
    orderId: number;
    productName?: string;
    sku?: string;
    quantity: number;
    price: number;
    total: number;
}
