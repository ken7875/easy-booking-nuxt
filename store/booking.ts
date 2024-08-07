import { defineStore } from 'pinia';
import { type ReserveHotelInfo } from '~~/model/hotel';
import { type BookingForm } from '~~/model/booking';
interface State {
  reserveHotelInfo: ReserveHotelInfo;
  bookingForm: BookingForm;
}

export const useBooking = defineStore('booking', {
  state: (): State => {
    return {
      reserveHotelInfo: {
        productId: '',
        bookingNum: 1,
        discount: 100,
        day: 1,
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
        },
        paid: 0
      },
      bookingForm: {
        lastName: '',
        firstName: '',
        email: '',
        coupon: '',
        phone: '',
        isBusiness: false,
        asking: ''
      }
    };
  },
  actions: {
    setResetHotelInfo(reserveHotelInfo: ReserveHotelInfo): void {
      this.reserveHotelInfo = reserveHotelInfo;
    },
    setBookingForm(form: BookingForm) {
      this.bookingForm = form;
    }
  },
  persist: [
    {
      key: 'reserve-hotel-info',
      storage: process.client ? sessionStorage : undefined,
      paths: ['reserveHotelInfo']
    },
    {
      key: 'booking-form',
      storage: process.client ? sessionStorage : undefined,
      paths: ['bookingForm']
    }
  ]
});
