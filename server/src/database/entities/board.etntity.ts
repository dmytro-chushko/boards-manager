import { Card } from ".";
import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Board {
  @ApiProperty({
    description: "Board ID",
    example: "986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: "Board title",
    example: "My new project",
  })
  @Column({ default: "New board", length: 100 })
  title: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Card, card => card.board)
  @JoinColumn()
  cards: Card[];
}
