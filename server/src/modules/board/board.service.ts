import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/database/entities";
import { Repository } from "typeorm";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { EXCEPTION_MESSAGE } from "src/utils/error-messages";
import { SUCCESSFUL_RESPONSE } from "src/utils/consts";

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
    return await this.boardRepository.find();
  }

  async updateBoard(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<string> {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) {
      throw new NotFoundException(EXCEPTION_MESSAGE.NOT_FOUND);
    }

    await this.boardRepository.save({
      ...board,
      ...updateBoardDto,
    });

    return SUCCESSFUL_RESPONSE.UPDATED;
  }
}
