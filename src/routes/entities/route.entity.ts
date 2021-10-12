import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'text' })
  path: string;

  @Column({ type: 'text' })
  method: string;

  @Column({ type: 'simple-array', default: [] })
  role: string[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
