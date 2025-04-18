import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity('sub_categories')
export class SubCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('number', { name: 'category_id', nullable: true })
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.subcategories)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => Product, (product) => product.subCategory)
    products: Product[];
}
