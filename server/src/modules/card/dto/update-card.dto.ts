import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString, MaxLength } from "class-validator";
import { STATUS } from "src/utils/enums/Status";
import { VALIDATION_ERROR } from "src/utils/error-messages";

export class UpdateCardDto {
  @ApiProperty({ example: "My first task", description: "Title of the task" })
  @IsString({ message: VALIDATION_ERROR.IS_STRING })
  @MaxLength(100, { message: `${VALIDATION_ERROR.MAX_LENGTH} 100` })
  readonly title: string;

  @ApiProperty({
    example: "Details of the task",
    description: "description of the task",
  })
  @IsString({ message: VALIDATION_ERROR.IS_STRING })
  @MaxLength(500, { message: `${VALIDATION_ERROR.MAX_LENGTH} 500` })
  readonly description: string;

  @ApiProperty({
    example: "Details of the task",
    description: "description of the task",
  })
  @IsNumber({}, { message: VALIDATION_ERROR.IS_NUMBER })
  readonly order: number;

  @ApiProperty({
    description: "Status of the card",
    example: "to-do",
  })
  @IsEnum(STATUS, {
    message: `${VALIDATION_ERROR.IS_ENUM} ${JSON.stringify(STATUS)}`,
  })
  readonly status: STATUS;
}
