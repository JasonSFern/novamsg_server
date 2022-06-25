export const count = <T>(array: T[] | undefined): number => {
  if (array && array.length > 0) return array.length - 1;
  return 0;
};
