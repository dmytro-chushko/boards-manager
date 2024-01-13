import { CardService } from "./card.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Card } from "src/database/entities";
import { ROUTE, SUCCESSFUL_RESPONSE } from "src/utils/consts";
import { UpdateCardDto } from "./dto/update-card.dto";
import { UpdateOrederDto } from "./dto/update-order.dto";

@ApiTags("Cards")
@Controller(ROUTE.CARD)
export class CardController {
  constructor(private cardService: CardService) {}

  @ApiOperation({ summary: "Create new card" })
  @ApiResponse({ status: 201, type: Card })
  @Post(ROUTE.PARAM_ID)
  createBoard(@Param("id") id: string): Promise<Card> {
    return this.cardService.createCard(id);
  }

  @ApiOperation({ summary: "Get all cards by board id" })
  @ApiResponse({ status: 200, type: [Card] })
  @Get(ROUTE.ALL)
  getAllCardsByBoard(@Query("id") id: string): Promise<Card[]> {
    return this.cardService.geAllCardsByBoardId(id);
  }

  @ApiOperation({ summary: "Update card data" })
  @ApiResponse({ status: 200, description: SUCCESSFUL_RESPONSE.UPDATED })
  @Put(ROUTE.PARAM_ID)
  updateCardById(
    @Param("id") id: string,
    @Body() dto: UpdateCardDto,
  ): Promise<string> {
    return this.cardService.updateCardById(id, dto);
  }

  @ApiOperation({ summary: "Update card order" })
  @ApiResponse({ status: 200, description: SUCCESSFUL_RESPONSE.UPDATED })
  @Patch(ROUTE.PARAM_ID)
  updateCardOrder(
    @Param("id") id: string,
    @Body() dto: UpdateOrederDto,
  ): Promise<string> {
    return this.cardService.updateCardOrder(id, dto);
  }

  @ApiOperation({ summary: "Remove card" })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_RESPONSE.DELETED,
  })
  @Delete(ROUTE.PARAM_ID)
  removeBoardById(@Param("id") id: string): Promise<string> {
    return this.cardService.removeCardById(id);
  }
}
