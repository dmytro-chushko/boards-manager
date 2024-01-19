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
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
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
  @ApiParam({
    name: "id",
    description: "String ID of the board that card belongs",
  })
  @Post(ROUTE.PARAM_ID)
  createCard(@Param("id") id: string): Promise<Card> {
    return this.cardService.createCard(id);
  }

  @ApiOperation({ summary: "Get all cards by board id" })
  @ApiResponse({ status: 200, type: [Card] })
  @Get(ROUTE.PARAM_ID)
  getAllCardsByBoard(@Param("id") id: string): Promise<Card[]> {
    return this.cardService.geAllCardsByBoardId(id);
  }

  @ApiOperation({ summary: "Update card data" })
  @ApiResponse({ status: 200, description: SUCCESSFUL_RESPONSE.UPDATED })
  @Put(ROUTE.PARAM_ID)
  updateCardById(
    @Param("id") id: string,
    @Body() dto: UpdateCardDto,
  ): Promise<{ message: string }> {
    return this.cardService.updateCardById(id, dto);
  }

  @ApiOperation({ summary: "Update card order" })
  @ApiResponse({ status: 200, description: SUCCESSFUL_RESPONSE.UPDATED })
  @Patch(ROUTE.PARAM_ID)
  updateCardOrder(
    @Param("id") id: string,
    @Body() dto: UpdateOrederDto,
  ): Promise<{ message: string }> {
    return this.cardService.updateCardOrder(id, dto);
  }

  @ApiOperation({ summary: "Remove card" })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_RESPONSE.DELETED,
  })
  @Delete(ROUTE.PARAM_ID)
  removeBoardById(@Param("id") id: string): Promise<{ message: string }> {
    return this.cardService.removeCardById(id);
  }
}
