import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { HTTP_METHOD, IAuthUser } from '../common/common.constant';
import { IDbEntityService } from '../db-entity/db-entity.service';
import { ORDER_STATUS, PAYMENT_STATUS } from './order.constant';
import { AxiosService, IHttpRequestService } from '../utils/http-service/axios.service';
import { APP_CONFIG } from 'src/common/common.config';

@Injectable()
export class OrderService {
    constructor(private readonly dbEntityService: IDbEntityService, private readonly httpsService: IHttpRequestService) {}

    async createOrder(user: IAuthUser, dto: CreateOrderDto) {
        const { gateway, shippingAddress, items } = dto;
        if (!items.length) throw new BadRequestException('Order must contain at least one item.');

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            let product;
            try {
                const response = await this.httpsService.sendRequest({
                    url: `${APP_CONFIG.PRODUCT_SERVICE_URL}/products/${item.productId}`,
                    method: HTTP_METHOD.GET,
                });
                product = response.data.data;
                if (!product) {
                    throw new BadRequestException(`Product with ID ${item.productId} not found`);
                }
            } catch (error) {
                console.log(`Error processing item: ${item.productId}`, error);
                throw new BadRequestException(`Product with ID ${item.productId} not found`);
            }
            const price = product.price;
            const quantity = item.quantity;
            const total = price * quantity;

            totalAmount += total;

            orderItems.push({
                productId: product.productId,
                quantity,
                price,
                total,
                productName: product.name,
                sku: product.sku,
            });
        }

        const order = {
            userId: user.id,
            orderStatus: ORDER_STATUS.PENDING,
            totalAmount,
            gateway,
            gatewayCurrency: 'BDT', //TODO: Get this from the payment gateway
            gatewayAmount: totalAmount, //TODO: Get this from the payment gateway
            paymentStatus: PAYMENT_STATUS.UNPAID,
            shippingAddress,
        };

        await this.dbEntityService.createOrderTransaction(order, orderItems);

        //TODO: Call the payment gateway to process the payment

        return {
            paymentUrl: 'https://payment-gateway.com/checkout', //TODO: Get this from the payment gateway
            successUrl: 'https://your-app.com/success', //TODO: Get this from the payment gateway
            cancelUrl: 'https://your-app.com/cancel', //TODO: Get this from the payment gateway
        };
    }
}
