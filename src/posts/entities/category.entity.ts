import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Post } from "./post.entity";

@Entity({
  name: "categories",
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP", name: "updated_at" })
  updatedAt: Date;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[]
}
