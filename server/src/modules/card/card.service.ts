import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, MoreThan, MoreThanOrEqual, Repository } from "typeorm";

import { Card } from "src/database/entities";
import { BoardService } from "../board/board.service";
import { STATUS } from "src/utils/enums/Status";
import { UpdateCardDto } from "./dto/update-card.dto";
import { EXCEPTION_MESSAGE } from "src/utils/error-messages";
import { SUCCESSFUL_RESPONSE } from "src/utils/consts";
import { UpdateOrederDto } from "./dto/update-order.dto";
import { IDeleteResultRows, IOrder } from "src/utils/types";

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

  async updateCardById(
    id: string,
    dto: UpdateCardDto,
  ): Promise<{ message: string }> {
    const result = await this.cardRepository
      .createQueryBuilder()
      .update(Card)
      .set({ ...dto })
      .where("id = :id", { id })
      .execute();

    if (!result.affected) {
      throw new NotFoundException(EXCEPTION_MESSAGE.NOT_FOUND);
    }

    return { message: SUCCESSFUL_RESPONSE.UPDATED };
  }

  async updateCardOrder(
    boardId: string,
    dto: UpdateOrederDto,
  ): Promise<{ message: string }> {
    const { draggedId, swappedId, draggedStatus, swappedStatus } = dto;

    if (!swappedId) {
      // ------------------------------------------
      //When card dragged to the empty status box
      // ------------------------------------------
      const { draggedOrder } = await this.cardRepository
        .createQueryBuilder("card")
        .select("card.order", "draggedOrder")
        .where("card.id = :draggedId", { draggedId })
        .getRawOne<{ draggedOrder: number }>();

      if (!draggedOrder) {
        throw new NotFoundException(EXCEPTION_MESSAGE.NOT_FOUND);
      }

      await this.cardRepository.decrement(
        {
          board: { id: boardId },
          status: draggedStatus,
          order: MoreThan(draggedOrder),
        },
        "order",
        1,
      );

      const order = await this.cardRepository.countBy({
        status: swappedStatus,
        board: { id: boardId },
      });

      await this.updateCardById(draggedId, {
        order: order ? order + 1 : 1,
        status: swappedStatus,
      });

      return { message: SUCCESSFUL_RESPONSE.UPDATED };
    }

    const orders = await this.cardRepository
      .createQueryBuilder("card")
      .select(["card.id", "card.order"])
      .where("card.id IN (:...ids)", { ids: [draggedId, swappedId] })
      .groupBy("card.id")
      .getRawMany<IOrder>();

    if (orders.length < 2) {
      throw new NotFoundException(EXCEPTION_MESSAGE.NOT_FOUND);
    }

    const draggedOrder = orders.find(
      card => card.card_id === draggedId,
    ).card_order;

    const swappedOrder = orders.find(
      card => card.card_id === swappedId,
    ).card_order;

    if (draggedStatus === swappedStatus) {
      // ------------------------------------------
      //Replace cards with one status
      // ------------------------------------------
      const whereOptions = {
        board: { id: boardId },
        status: draggedStatus,
        order:
          draggedOrder > swappedOrder
            ? Between(swappedOrder, draggedOrder)
            : Between(draggedOrder, swappedOrder),
      };

      await this.cardRepository[
        draggedOrder > swappedOrder ? "increment" : "decrement"
      ](whereOptions, "order", 1);

      await this.updateCardById(draggedId, { order: swappedOrder });
    } else {
      // ------------------------------------------
      //Replace cards with defferent statuses
      // ------------------------------------------
      await this.cardRepository.decrement(
        {
          board: { id: boardId },
          status: draggedStatus,
          order: MoreThan(draggedOrder),
        },
        "order",
        1,
      );

      await this.cardRepository.increment(
        {
          board: { id: boardId },
          status: swappedStatus,
          order: MoreThanOrEqual(swappedOrder),
        },
        "order",
        1,
      );

      await this.updateCardById(draggedId, {
        order: swappedOrder,
        status: swappedStatus,
      });
    }

    return { message: SUCCESSFUL_RESPONSE.UPDATED };
  }

  async removeCardById(id: string): Promise<{ message: string }> {
    const result = await this.cardRepository
      .createQueryBuilder()
      .delete()
      .from(Card)
      .where("id = :id", { id })
      .returning(["order", "status", "board.id"])
      .execute();

    if (!result.affected) {
      throw new NotFoundException(EXCEPTION_MESSAGE.NOT_FOUND);
    }

    const { order, status, boardId } = result.raw[0] as IDeleteResultRows;

    await this.cardRepository.decrement(
      {
        board: { id: boardId },
        status,
        order: MoreThan(order),
      },
      "order",
      1,
    );

    return { message: SUCCESSFUL_RESPONSE.DELETED };
  }
}
