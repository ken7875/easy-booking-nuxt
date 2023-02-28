type Query = { [key: string]: any };

export const queryFactory = (query: Query) => {
  const entries = Object.entries(query);
  let queryStr = '';

  for (const [index, [key, value]] of Object.entries(entries)) {
    if (+index === 0) {
      queryStr += `?${key}=${value}`;
    } else {
      queryStr += `&${key}=${value}`;
    }
  }

  return queryStr;
};
