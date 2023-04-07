import myFetch from '~~/utils/myFetch';
import { AllHoteFilterObj } from '~~/model/hotel';
import { queryFactory } from '~~/utils/queryFactory';
import { GetAllResponse, BaseResponse } from '~~/model/api';

interface getAllHotelsApiResponse<T> extends GetAllResponse<T> {
  total: number;
}

export const getHotHotels = <T>(): Promise<GetAllResponse<T>> => {
  console.log('hot products');
  return myFetch<GetAllResponse<T>>('/products/hotProducts', {
    method: 'GET'
  });
};

export const getAllHotelsApi = <T>(body?: AllHoteFilterObj): Promise<getAllHotelsApiResponse<T>> => {
  // const path = query ? `products?${query}` : 'products';
  // const queryStr: string = Object.keys(query).length > 0 ? queryFactory(query) : '';

  let query = '';
  if (body) {
    query = queryFactory(body);
  }

  return myFetch<getAllHotelsApiResponse<T>>(`/products${query}`, {
    method: 'GET'
  });
};

export const getProductApi = <T>(id: string): Promise<BaseResponse<T>> =>
  myFetch<BaseResponse<T>>(`products/${id}`, {
    method: 'GET'
  });
