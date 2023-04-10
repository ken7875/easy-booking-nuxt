import myFetch from '~~/utils/myFetch';
import { ReserveHotelInfo } from '~~/model/hotel';

export const setReserveDataApi = (reserveData: ReserveHotelInfo) =>
  myFetch(
    '/api/reserveDetail',
    {
      method: 'POST',
      body: reserveData
    },
    true
  );

export const getReserveDataApi = (): Promise<ReserveHotelInfo> =>
  myFetch<ReserveHotelInfo>(
    '/api/reserveDetail',
    {
      method: 'GET'
    },
    true
  );
