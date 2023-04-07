export default (text: string | number, limit = 10): string => {
  let res = text;
  if (typeof text !== 'string') {
    text = text.toString();
  }
  if (typeof text === 'string' && text.length >= limit - 1) {
    res = text.slice(0, limit);
  }

  return res as string;
};
