import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
}

export class CreateOrderDto {
    @IsString()
    gateway: string;

    @IsString()
    shippingAddress: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}
