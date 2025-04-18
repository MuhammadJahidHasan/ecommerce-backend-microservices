import { ICategory, ISubCategory } from '../category/category.interface';

export interface IProduct {
    id: number;
    name: string;
    description?: string;
    sku: string;
    price: number;
    categoryId: number;
    subCategory?: ISubCategory;
    subCategoryId: number;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    image: string;
}
