export const labelRecord = <T>(list: T[]) => {
  return list.map((item, index) => {
    return { no: index + 1, ...item };
  });
};
