import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    async getAllProducts(@Query('offset') offset = '0', @Query('limit') limit = '10') {
        const parsedOffset = parseInt(offset, 10);
        const parsedLimit = parseInt(limit, 10);

        return this.productService.getAll(parsedOffset, parsedLimit);
    }
}
