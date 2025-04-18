import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    subCategoryId: number;
}
