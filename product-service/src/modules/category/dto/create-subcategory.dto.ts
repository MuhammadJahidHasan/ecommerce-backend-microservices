import { IsString, IsNumber, IsOptional, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateSubCategotyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    categoryId: number;
}
