import myFetch from '~~/utils/myFetch';
import { BaseResponse, GetAllResponse } from '~~/model/api';
import { PickUpApiParams } from '~~/model/pickUp';

export const getAllPickUpOrderApi = <T>(userId: string): Promise<GetAllResponse<T>> =>
  myFetch<GetAllResponse<T>>(`/pickUp?userId=${userId}`, {
    method: 'GET'
  });

export const createPickUpOrderApi = <T>(body: PickUpApiParams): Promise<BaseResponse<T>> =>
  myFetch<BaseResponse<T>>('/pickUp', {
    method: 'POST',
    body
  });
