import { ReserveHotelInfo, Hotel } from './hotel';
export interface BookingForm {
  lastName: string;
  firstName: string;
  email: string;
  coupon: string;
  phone: string;
  isBusiness: boolean;
  asking: string;
}

export interface OrderDetailParams extends BookingForm {
  product: string;
  roomType: string;
  paid: number;
  checkinTime: Date;
  checkoutTime: Date;
  day: number;
  quantity: number;
  roomTypeId: string;
  userName: string;
}

export interface OrderDetail extends Omit<OrderDetailParams, 'roomTypeId' | 'product'> {
  _id: string;
  createdAt: string;
  product: Hotel;
}
