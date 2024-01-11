import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BoardService } from "./board.service";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "src/database/entities";
import { ROUTE, SUCCESSFUL_RESPONSE } from "src/utils/consts";

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

  @ApiOperation({ summary: "Update board data" })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_RESPONSE.UPDATED,
  })
  @Put(ROUTE.PARAM_ID)
  updateBoard(
    @Param("id") id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<string> {
    return this.boardService.updateBoard(id, updateBoardDto);
  }
}
