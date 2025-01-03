export const generateKey = (array: string[], key: string) => {
  return array.map((_, idx) => `${key}.${idx}`);
};
