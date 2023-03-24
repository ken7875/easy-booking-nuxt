import myFetch from '@/utils/myFetch';
import { AllHoteFilterObj } from '@/model/hotel';
import { queryFactory } from '@/utils/queryFactory';

export const getHotHotels = () =>
  myFetch('/products/hotProducts', {
    method: 'GET'
  });

export const getAllHotels: (body?: AllHoteFilterObj) => any = (body = {}) => {
  // const path = query ? `products?${query}` : 'products';
  // const queryStr: string = Object.keys(query).length > 0 ? queryFactory(query) : '';
  const query = queryFactory(body);
  console.log(query, 'query');
  return myFetch(`/products${query}`, {
    method: 'GET'
  });
};
