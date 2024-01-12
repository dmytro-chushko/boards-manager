import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "src/database/entities";
import { Repository } from "typeorm";
import { BoardService } from "../board/board.service";
import { STATUS } from "src/utils/enums/Status";
import { UpdateCardDto } from "./dto/update-card.dto";
import { EXCEPTION_MESSAGE } from "src/utils/error-messages";
import { SUCCESSFUL_RESPONSE } from "src/utils/consts";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
    private readonly boardService: BoardService,
  ) {}

  async createCard(boardId: string): Promise<Card> {
    const board = await this.boardService.getBoardById(boardId);
    const order = await this.cardRepository.countBy({
      status: STATUS.TO_DO,
      board: { id: boardId },
    });

    const card = this.cardRepository.create({
      board,
      order: order ? order + 1 : 1,
    });

    return await this.cardRepository.save(card);
  }

  async geAllCardsByBoardId(boardId: string): Promise<Card[]> {
    return await this.cardRepository
      .createQueryBuilder("card")
      .leftJoin("card.board", "board")
      .select(["card"])
      .addSelect(["board.id", "board.title"])
      .where("board.id = :boardId", { boardId })
      .getMany();
  }

  // async getCardById(id: string): Promise<Card> {}

  async updateCardById(id: string, dto: UpdateCardDto): Promise<string> {
    const result = await this.cardRepository
      .createQueryBuilder()
      .update(Card)
      .set({ ...dto })
      .where("id = :id", { id })
      .execute();

    if (!result.affected) {
      throw new NotFoundException(EXCEPTION_MESSAGE.NOT_FOUND);
    }

    return SUCCESSFUL_RESPONSE.UPDATED;
  }

  // async updateCardOrder(id: string): Promise<string> {}

  // async reomveCardById(id: string): Promise<string> {}
}
