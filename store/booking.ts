import { defineStore } from 'pinia';
import { ReserveHotelInfo } from '~~/model/hotel';

interface State {
  reserveHotelInfo: ReserveHotelInfo;
}

export const useBooking = defineStore('booking', {
  state: (): State => {
    return {
      reserveHotelInfo: {
        productId: '',
        bookingNum: 1,
        discount: 100,
        roomTypeInfo: {
          remainRoom: 0,
          name: '',
          image: [],
          person: 0,
          service: [],
          price: 0,
          roomNum: 0,
          _id: ''
        },
        date: {
          checkinTime: new Date(),
          checkoutTime: new Date(+new Date() + 86400000)
        }
      }
    };
  },
  actions: {
    setReserHotelInfo(reserveHotelInfo: ReserveHotelInfo): void {
      this.reserveHotelInfo = reserveHotelInfo;
    }
  },
  persist: {
    key: 'reserve-hotel-info',
    storage: process.client ? sessionStorage : undefined,
    paths: ['reserveHotelInfo']
  }
});
