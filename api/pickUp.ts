import myFetch from '~~/utils/myFetch';
import type { BaseResponse, GetAllResponse } from '~~/model/api';
import type { PickUpApiParams } from '~~/model/pickUp';

export const getAllPickUpOrder = <T>(userId: string): Promise<GetAllResponse<T>> =>
  myFetch<GetAllResponse<T>>(`/pickUp?userId=${userId}`, {
    method: 'GET'
  });

export const createPickUpOrder = <T>(body: PickUpApiParams): Promise<BaseResponse<T>> =>
  myFetch<BaseResponse<T>>('/pickUp', {
    method: 'POST',
    body
  });
