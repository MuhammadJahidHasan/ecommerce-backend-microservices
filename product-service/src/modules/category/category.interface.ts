import { IProduct } from '../product/product.interface';

export interface ICategory {
    id: number;
    name: string;
    subcategories?: ISubCategory[];
}
export interface ISubCategory {
    id: number;
    name: string;
    categoryId: number;
    category?: ICategory;
    products?: IProduct[];
}
