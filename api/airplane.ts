import myFetch from '~~/utils/myFetch';
// import { ReserveHotelInfo } from '~~/model/hotel';
import type { AirplaneTicket } from '~~/model/airplane';
import type { GetAllResponse } from '~~/model/api';

export const getAllAirplaneTicket = (): Promise<GetAllResponse<AirplaneTicket[]>> =>
  myFetch<GetAllResponse<AirplaneTicket[]>>('/airplane', {
    method: 'GET'
  });
