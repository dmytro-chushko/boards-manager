type EnumObject<T> = { [K in keyof T]: string | number };

export const representEnum = <T>(objEnum: EnumObject<T>): string => {
  return Object.values(objEnum).join(", ");
};
