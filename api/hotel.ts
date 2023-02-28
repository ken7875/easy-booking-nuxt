import myFetch from '@/utils/myFetch';
import { AllHotelQuery } from '@/model/hotel';
import { queryFactory } from '@/utils/queryFactory';

export const getHotHotels = () => {
  return myFetch('/products/hotProducts', {
    method: 'GET'
  });
};

export const getAllHotels: (query?: AllHotelQuery) => any = (query = {}) => {
  // const path = query ? `products?${query}` : 'products';
  const path = 'products';
  const queryStr: string = Object.keys(query).length > 0 ? queryFactory(query) : '';

  return myFetch(`${path}${queryStr}`, {
    method: 'GET'
  });
};
