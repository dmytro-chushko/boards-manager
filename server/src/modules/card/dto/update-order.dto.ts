import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum, IsString } from "class-validator";

import { STATUS } from "src/utils/enums/Status";
import { VALIDATION_ERROR } from "src/utils/error-messages";
import { representEnum } from "src/utils/helpers/represent-enum";

export class UpdateOrederDto {
  @ApiProperty({
    description: "Id of card that was dragged on",
    example: "986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e",
  })
  @IsString({ message: VALIDATION_ERROR.IS_STRING })
  @IsDefined()
  readonly draggedId: string;

  @ApiProperty({
    description: "Id of card that was swapped by dragged card",
    example: "986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e",
  })
  @IsString({ message: VALIDATION_ERROR.IS_STRING })
  @IsDefined()
  readonly swappedId: string;

  @ApiProperty({
    description: "Status of card that was dragged on",
    example: "to-do",
  })
  @IsEnum(STATUS, {
    message: `${VALIDATION_ERROR.IS_ENUM} ${representEnum(STATUS)}`,
  })
  @IsDefined()
  readonly draggedStatus: STATUS;

  @ApiProperty({
    description: "Status of card that was swapped by dragged card",
    example: "to-do",
    enum: representEnum(STATUS).split(", "),
  })
  @IsEnum(STATUS, {
    message: `${VALIDATION_ERROR.IS_ENUM} ${representEnum(STATUS)}`,
  })
  @IsDefined()
  readonly swappedStatus: STATUS;
}
