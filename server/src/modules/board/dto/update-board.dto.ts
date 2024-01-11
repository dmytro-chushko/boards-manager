import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";
import { VALIDATION_ERROR } from "src/utils/error-messages";

export class UpdateBoardDto {
  @ApiProperty({ example: "My first board", description: "Title of the board" })
  @IsString({ message: VALIDATION_ERROR.IS_STRING })
  @MaxLength(100, { message: `${VALIDATION_ERROR.MAX_LENGTH} 100` })
  readonly title: string;
}
