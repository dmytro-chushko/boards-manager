import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board, Card } from "./database/entities";
import { BoardModule } from "./modules/board/board.module";
import { CardModule } from "./modules/card/card.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_NAME,
      entities: [Board, Card],
      synchronize: true,
    }),
    BoardModule,
    CardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
