import { getHotHotels, getAllHotels } from './hotel';
import { createBooking, getOrders } from './booking';
import { login, signUp, getAvatar, getUser, updateUser } from './auth';
import { getAllPickUpOrder, createPickUpOrder } from './pickUp';
import { getAllAirplaneTicket } from './airplane';

const apiMethods = {
  hotel: {
    getHotHotels,
    getAllHotels
  },
  booking: {
    createBooking,
    getOrders
  },
  auth: {
    login,
    signUp,
    getAvatar,
    getUser,
    updateUser
  },
  pickUp: {
    getAllPickUpOrder,
    createPickUpOrder
  },
  airplane: {
    getAllAirplaneTicket
  }
};

export { apiMethods };
