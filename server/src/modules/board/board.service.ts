import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/database/entities";
import { Repository } from "typeorm";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { SUCCESSFUL_RESPONSE } from "src/utils/consts";
import { checkAndReturnEntity } from "src/utils/helpers/check-and-return";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async createBoard(): Promise<Board> {
    const board = this.boardRepository.create();

    return await this.boardRepository.save(board);
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find({
      relations: { cards: true },
    });
  }

  async getBoardById(id: string): Promise<Board> {
    const board = await checkAndReturnEntity<Board>(this.boardRepository, {
      where: { id },
      relations: { cards: true },
    });

    return board;
  }

  async updateBoard(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<string> {
    const board = await checkAndReturnEntity<Board>(this.boardRepository, {
      where: { id },
    });

    await this.boardRepository.save({
      ...board,
      ...updateBoardDto,
    });

    return SUCCESSFUL_RESPONSE.UPDATED;
  }

  async removeBoardById(id: string): Promise<string> {
    const board = await checkAndReturnEntity<Board>(this.boardRepository, {
      where: { id },
    });

    await this.boardRepository.remove(board);

    return SUCCESSFUL_RESPONSE.DELETED;
  }
}
