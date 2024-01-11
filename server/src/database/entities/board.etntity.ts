import { Card } from ".";
import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
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
  @Column({ length: 100 })
  title: string;

  @OneToMany(() => Card, card => card.board)
  @JoinColumn()
  cards: Card[];
}
