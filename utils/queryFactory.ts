type Query = { [key: string]: any };

export const queryFactory = (query: Query) => {
  const entries = Object.entries(query);
  let queryStr = '';
  let index = 0;

  entries.forEach(([key, value]) => {
    if (!value) {
      return;
    }
    console.log(key, value);
    const parseValue = typeof value === 'object' ? JSON.stringify(value) : value;
    if (index === 0) {
      queryStr += `?${key}=${parseValue}`;
    } else {
      queryStr += `&${key}=${parseValue}`;
    }
    index++;
  });

  return queryStr;
};
