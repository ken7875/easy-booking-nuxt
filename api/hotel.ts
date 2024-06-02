import myFetch from '~~/utils/myFetch';
import { type AllHoteFilterObj } from '~~/model/hotel';
import { queryFactory } from '~~/utils/queryFactory';
import type{ GetAllResponse, BaseResponse } from '~~/model/api';
import { type Hotel } from '~~/model/hotel';

interface getAllHotelsApiResponse<T> extends GetAllResponse<T> {
  total: number;
}

export const getHotHotels = (): Promise<GetAllResponse<Hotel[]>> => {
  return myFetch<GetAllResponse<Hotel[]>>('/products/hotProducts', {
    method: 'GET'
  });
};

export const getAllHotels = (body?: AllHoteFilterObj): Promise<getAllHotelsApiResponse<Hotel[]>> => {
  // const path = query ? `products?${query}` : 'products';
  // const queryStr: string = Object.keys(query).length > 0 ? queryFactory(query) : '';

  let query = '';
  if (body) {
    query = queryFactory(body);
  }

  return myFetch<getAllHotelsApiResponse<Hotel[]>>(`/products${query}`, {
    method: 'GET'
  });
};

export const getProductApi = <T>(id: string): Promise<BaseResponse<T>> =>
  myFetch<BaseResponse<T>>(`products/${id}`, {
    method: 'GET'
  });
