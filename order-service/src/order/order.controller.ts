import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../common/decorators/user.decorator';
import { IAuthUser } from '../common/common.constant';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(@User() user: IAuthUser, @Body() dto: CreateOrderDto) {
        return await this.orderService.createOrder(user, dto);
    }
}
