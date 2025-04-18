import { Body, Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubCategotyDto } from './dto/create-subcategory.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('create')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    async getAllCategories() {
        return this.categoryService.getAllCategory();
    }

    @Post('sub/create')
    async createSubCategory(@Body() dto: CreateSubCategotyDto) {
        return this.categoryService.createSubcategory(dto);
    }

    @Get('sub')
    async getAllSubCategories() {
        return this.categoryService.getAllSubCategory();
    }

    @Get('sub/:categoryId')
    async getSubCategoriesByCategoryId(@Param('categoryId', ParseIntPipe) categoryId: number) {
        return this.categoryService.getAllSubCategoryByCategoryId(categoryId);
    }
}
