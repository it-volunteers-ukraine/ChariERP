export const getBoolean = (key: string | undefined) => {
  switch (key) {
    case 'true':
      return true;

    case 'false':
      return false;

    default:
      return true;
  }
};
