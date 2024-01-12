import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "src/database/entities";
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  exports: [BoardService],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
