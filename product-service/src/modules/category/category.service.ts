import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IDbEntityService } from '../../database/database-entity.service';
import { BadRequestException } from '../../common/exception/bad-request.exception';
import { ERROR_CODES } from '../../common/exception/error-code';
import { CreateSubCategotyDto } from './dto/create-subcategory.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly dbEntityService: IDbEntityService) {}

    async createCategory(createCategoryDto: CreateCategoryDto) {
        const { name } = createCategoryDto;
        const existingCategory = await this.dbEntityService.getCategoryByName(name);
        if (existingCategory) {
            throw new BadRequestException(ERROR_CODES.E_INVALID_DATA, 'This category already exists');
        }

        const createCategory = await this.dbEntityService.createCategory({ name });

        return createCategory;
    }

    async getAllCategory() {
        const categories = await this.dbEntityService.getAllCategory();
        return categories;
    }

    async createSubcategory(dto: CreateSubCategotyDto) {
        const { name, categoryId } = dto;

        const category = await this.dbEntityService.getCategory(categoryId);
        if (!category) {
            throw new BadRequestException(ERROR_CODES.E_INVALID_DATA, 'No categoty found by this id');
        }

        const subCategory = await this.dbEntityService.createSubCategory({ name, categoryId });

        return subCategory;
    }

    async getAllSubCategory() {
        const categories = await this.dbEntityService.getAllSubCategory();
        return categories;
    }

    async getAllSubCategoryByCategoryId(categoryId: number) {
        const categories = await this.dbEntityService.getAllSubCategoryByCategoryId(categoryId);
        return categories;
    }
}
