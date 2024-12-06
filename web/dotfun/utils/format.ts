export const format = (delimiter: string, ...values: (string | null)[]) => {
  let result = delimiter.slice(0, delimiter.length);
  values.forEach((value) => {
    if (value) result = result.replace("%", value);
  });
  return result;
};

export default format;
