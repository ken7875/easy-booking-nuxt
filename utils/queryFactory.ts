import qs from 'qs';

type Query = { [key: string]: any };

export const queryFactory = (query: Query) => {
  const entries = Object.entries(query);
  let queryStr = '';
  let index = 0;
  entries.forEach(([key, value]) => {
    if (!value) {
      return;
    }

    const parseValue = typeof value === 'object' ? JSON.stringify(value) : value;
    if (index === 0) {
      queryStr += `?${key}=${parseValue}`;
    } else {
      queryStr += `&${key}=${parseValue}`;
    }
    index++;
  });

  // const queryString = qs.stringify(query, { encode: false });
  // console.log(queryString, 'queryString');
  // return `?${queryString}`;
  return queryStr;
};
