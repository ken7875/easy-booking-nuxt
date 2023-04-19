import myFetch from '~~/utils/myFetch';
import { ReserveHotelInfo } from '~~/model/hotel';
import { OrderDetailParams } from '~~/model/booking';
import { BaseResponse, GetAllResponse } from '~~/model/api';

export const createBookingApi = <T>(body: OrderDetailParams): Promise<BaseResponse<T>> =>
  myFetch<BaseResponse<T>>('/booking', {
    method: 'POST',
    body
  });

export const getOrdersApi = <T>(): Promise<GetAllResponse<T>> =>
  myFetch<GetAllResponse<T>>('/booking', {
    method: 'GET'
  });
// export const setReserveDataApi = (reserveData: ReserveHotelInfo) =>
//   myFetch(
//     '/api/reserveDetail',
//     {
//       method: 'POST',
//       body: reserveData
//     },
//     true
//   );

// export const getReserveDataApi = (): Promise<ReserveHotelInfo> =>
//   myFetch<ReserveHotelInfo>(
//     '/api/reserveDetail',
//     {
//       method: 'GET'
//     },
//     true
//   );
