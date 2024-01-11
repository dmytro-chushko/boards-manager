import { ApiProperty } from "@nestjs/swagger";
import { STATUS } from "src/utils/enums/Status";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Board } from ".";

@Entity({ orderBy: { order: "ASC" } })
export class Card {
  @ApiProperty({
    description: "Card ID",
    example: "986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: "Card title",
    example: "To do smth",
  })
  @Column({ length: 100 })
  title: string;

  @ApiProperty({
    description: "Card discription",
    example: "To do smth with some requirements",
  })
  @Column({ length: 500 })
  description: string;

  @ApiProperty({
    description: "Order of the card in a specific list",
    example: 1,
  })
  @Column()
  order: number;

  @ApiProperty({
    description: "Status of the card",
    example: "to-do",
  })
  @Column({ type: "enum", enum: STATUS })
  status: STATUS;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Board, board => board.cards)
  board: Board;
}
