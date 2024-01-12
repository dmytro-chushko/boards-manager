import { NotFoundException } from "@nestjs/common";
import { Repository, FindOneOptions } from "typeorm";

import { EXCEPTION_MESSAGE } from "src/utils/error-messages";

export const checkAndReturnEntity = async <T>(
  customRepository: Repository<T>,
  options: FindOneOptions<T>,
): Promise<T> => {
  const entity = await customRepository.findOne(options);
  if (!entity) {
    throw new NotFoundException(EXCEPTION_MESSAGE.NOT_FOUND);
  }

  return entity;
};
