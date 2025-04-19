import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { ICategory, ISubCategory } from '../modules/category/category.interface';
import { IProduct } from '../modules/product/product.interface';

// Use abstract class instead of an interface so that inject from service Without @Inject() syntax
export abstract class IDbEntityService {
    abstract createCategory(data: Partial<ICategory>): Promise<ICategory | null>;
    abstract getCategory(id: number): Promise<ICategory | null>;
    abstract getCategoryByName(name: string): Promise<ICategory | null>;
    abstract getAllCategory(): Promise<ICategory[]>;
    abstract createSubCategory(data: Partial<ISubCategory>): Promise<ISubCategory | null>;
    abstract getAllSubCategory(): Promise<ISubCategory[]>;
    abstract getAllSubCategoryByCategoryId(categoryId: number): Promise<ISubCategory[] | null>;
    abstract getSubCategory(id: number): Promise<ISubCategory | null>;
    abstract createProduct(data: Partial<IProduct>): Promise<IProduct | null>;
    abstract getAllProduct(offset: number, limit: number): Promise<{ products: IProduct[]; offset: number; limit: number; totalCount: number }>;
    abstract getProduct(id: number): Promise<IProduct | null>;
}

@Injectable()
export class DbEntityService implements IDbEntityService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<IProduct>,

        @InjectRepository(Category)
        private readonly categoryRepo: Repository<ICategory>,

        @InjectRepository(SubCategory)
        private readonly subCategoryRepo: Repository<ISubCategory>,

        private readonly dataSource: DataSource,
    ) {}
    async createCategory(data: Partial<ICategory>): Promise<ICategory | null> {
        return this.categoryRepo.save(data);
    }

    async getCategory(id: number): Promise<ICategory | null> {
        return this.categoryRepo.findOne({
            where: {
                id,
            },
        });
    }

    async getCategoryByName(name: string): Promise<ICategory | null> {
        return this.categoryRepo.findOne({
            where: {
                name: name,
            },
        });
    }
    async getAllCategory(): Promise<ICategory[]> {
        return await this.categoryRepo.find();
    }

    async createSubCategory(data: Partial<ISubCategory>): Promise<ISubCategory | null> {
        return await this.subCategoryRepo.save(data);
    }

    async getAllSubCategory(): Promise<ISubCategory[]> {
        return await this.subCategoryRepo.find({
            relations: {
                category: true,
            },
        });
    }
    async getAllSubCategoryByCategoryId(categoryId: number): Promise<ISubCategory[] | null> {
        return this.subCategoryRepo.find({
            where: {
                categoryId,
            },
        });
    }
    async getSubCategory(id: number): Promise<ISubCategory | null> {
        return await this.subCategoryRepo.findOne({
            where: {
                id,
            },
        });
    }

    async createProduct(data: Partial<IProduct>): Promise<IProduct | null> {
        return this.productRepo.save(data);
    }

    async getAllProduct(offset: number, limit: number): Promise<{ products: IProduct[]; offset: number; limit: number; totalCount: number }> {
        const products = await this.productRepo.find({
            relations: ['subCategory', 'subCategory.category'],
            where: {
                isActive: true,
            },
            skip: offset,
            take: limit,
        });

        const totalCount = await this.productRepo.count({
            where: {
                isActive: true,
            },
        });
        return {
            products,
            offset,
            limit,
            totalCount,
        };
    }

    async getProduct(id: number): Promise<IProduct | null> {
        return this.productRepo.findOne({
            where: {
                id,
            },
            relations: ['subCategory', 'subCategory.category'],
        });
    }
}
