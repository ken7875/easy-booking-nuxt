import { getHotHotels, getAllHotels } from './hotel';
import { createBooking, getOrders } from './booking';
import { login, signUp, getAvatar, getUser, updateUser } from './auth';
import { getAllPickUpOrder, createPickUpOrder } from './pickUp';

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
    }
}

export {
    apiMethods
}