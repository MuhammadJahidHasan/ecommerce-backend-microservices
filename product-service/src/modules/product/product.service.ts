import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { IDbEntityService } from '../../database/database-entity.service';
import { BadRequestException } from '../../common/exception/bad-request.exception';
import { ERROR_CODES } from '../../common/exception/error-code';

@Injectable()
export class ProductService {
    constructor(private readonly dbEntityService: IDbEntityService) {}

    async create(dto: CreateProductDto) {
        const { name, description, price, image, sku, brand, subCategoryId } = dto;
        const data = {
            name,
            description,
            price,
            brand,
            image,
            sku,
            isActive: true,
            subCategoryId,
        };
        const subCategory = await this.dbEntityService.getSubCategory(subCategoryId);
        if (!subCategory) {
            throw new BadRequestException(ERROR_CODES.E_INVALID_DATA, 'No subCategory found');
        }
        const product = await this.dbEntityService.createProduct(data);
        return product;
    }

    async getAll(_offset: number, _limit: number) {
        const { products, offset, limit, totalCount } = await this.dbEntityService.getAllProduct(_offset, _limit);

        const cleanedProducts = products.map((product) => {
            const subCategory = product.subCategory;
            const category = subCategory?.category;

            return {
                productId: product.id,
                name: product.name,
                sku: product.sku,
                image: product.image,
                description: product.description,
                price: product.price,
                category: {
                    id: category?.id,
                    name: category?.name,
                },
                subCategory: {
                    id: subCategory?.id,
                    name: subCategory?.name,
                },
            };
        });

        return {
            products: cleanedProducts,
            offset,
            limit,
            totalCount,
        };
    }
}
