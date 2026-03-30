import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { User } from "../../users/entitites/user.entity";
import { Category } from "./category.entity";

@Entity({
  name: "posts"
})
export class Post {
  @ApiProperty({example: 1, description: "ID del post"})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: "Mi primer post", description: "Título del post"})
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({example: "Este es mi primer post", description: "Contenido del post"})
  @Column({ type: 'text', nullable: true })
  content: string;

  @ApiProperty({example: "https://example.com/cover.jpg", description: "URL de la imagen de portada del post"})
  @Column({type: "varchar", length: 500, name: "cover_image", nullable: true})
  coverImage: string;

  @ApiProperty({example: "Resumen del post", description: "Resumen del post"})
  @Column({ type: 'varchar', length: 255, name: "sumary", nullable: true })
  sumary: string;

  @ApiProperty({example: 1, description: "ID del usuario que creó el post"})
  @Column({type: "boolean", default: true, name: "is_draft"})
  isDraft: boolean;

  @ApiProperty({example: "2024-01-01T00:00:00Z", description: "Fecha de creación del post"})
  @CreateDateColumn({type: "timestamptz", default: () => "CURRENT_TIMESTAMP", name: "created_at"})
  createdAt: Date;

  @ApiProperty({example: "2024-01-02T00:00:00Z", description: "Fecha de última actualización del post"})
  @UpdateDateColumn({type: "timestamptz", default: () => "CURRENT_TIMESTAMP", name: "updated_at"})
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {nullable: false})
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({
    name: "post_categories",
    joinColumn: {name: "post_id", referencedColumnName: "id"},
    inverseJoinColumn: {name: "category_id", referencedColumnName: "id"}
  })
  categories: Category[];
}
