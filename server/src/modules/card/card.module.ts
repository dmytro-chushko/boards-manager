import { Module } from "@nestjs/common";
import { CardService } from "./card.service";
import { Card } from "src/database/entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "../board/board.module";
import { CardController } from "./card.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Card]), BoardModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
