import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BoardService } from "./board.service";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "src/database/entities";
import { ROUTE, SUCCESSFUL_RESPONSE } from "src/utils/consts";
import { Response } from "express";

@ApiTags("Boards")
@Controller(ROUTE.BOARD)
export class BoardController {
  constructor(private boardService: BoardService) {}

  @ApiOperation({ summary: "Create new board" })
  @ApiResponse({ status: 201, type: Board })
  @Post()
  createBoard(): Promise<Board> {
    return this.boardService.createBoard();
  }

  @ApiOperation({ summary: "Get all existing boards" })
  @ApiResponse({ status: 200, type: [Board] })
  @Get()
  getAllBoarrds(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @ApiOperation({ summary: "Get boards by id" })
  @ApiResponse({ status: 200, type: Board })
  @Get(ROUTE.PARAM_ID)
  getBoardById(@Param("id") id: string): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @ApiOperation({ summary: "Update board data" })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_RESPONSE.UPDATED,
  })
  @Put(ROUTE.PARAM_ID)
  async updateBoard(
    @Param("id") id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.boardService.updateBoard(id, updateBoardDto));
  }

  @ApiOperation({ summary: "Remove board" })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_RESPONSE.DELETED,
  })
  @Delete(ROUTE.PARAM_ID)
  removeBoardById(@Param("id") id: string): Promise<string> {
    return this.boardService.removeBoardById(id);
  }
}
