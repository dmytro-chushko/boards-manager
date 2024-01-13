import { STATUS } from "src/utils/enums/Status";

export interface IDeleteResultRows {
  order: number;
  status: STATUS;
  boardId: string;
}
