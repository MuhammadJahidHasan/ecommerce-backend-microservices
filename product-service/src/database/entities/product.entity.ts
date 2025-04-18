import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SubCategory } from './sub-category.entity';
import { Category } from './category.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    name: string;

    @Column({ unique: true })
    sku: string;

    @Column({ unique: true })
    image: string;

    @Column('text', { nullable: true })
    description: string;

    @Column('double', { precision: 12, scale: 2 })
    price: number;

    @Column({ type: 'number', name: 'subcategory_id' })
    subCategoryId: number;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
    @JoinColumn({ name: 'subcategory_id' })
    subCategory: SubCategory;
}
