import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "profiles"})
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 30 })
  name: string;

  @Column({type: "varchar", length: 50, name: "last_name" })
  LastName: string;

  @Column({type: "varchar", length: 50, nullable: true})
  avatar: string;

  @CreateDateColumn({type: "timestamptz", default: () => "CURRENT_TIMESTAMP", name: "created_at"})
  createdAt : Date

  @UpdateDateColumn({type: "timestamptz", default: () => "CURRENT_TIMESTAMP", name: "updated_at" })
  updatedAt : Date


}
