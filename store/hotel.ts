import { defineStore } from 'pinia';
import { getAllHotelsApi } from '@/api/index';
import { Hotel, AllHotelMap, AllHotelQuery } from '@/model/hotel';

interface State {
  allHotels: Hotel[];
  hotelTotal: number;
  hotel: Hotel;
  hotHotels: Hotel[];
  filterData: string;
  baseUrl: string;
}

export const useHotel = defineStore('hotelStore', {
  state: (): State => {
    const runtimeConfig = useRuntimeConfig();
    const { baseUrl } = runtimeConfig.public;
    return {
      allHotels: [],
      hotelTotal: 0,
      hotel: {
        id: '',
        locations: {
          coordinates: [],
          address: ''
        },
        name: '',
        price: 0,
        country: '台灣',
        ratingAverage: 0,
        ratingQuantity: '',
        description: '',
        images: [],
        summary: '',
        viewPorts: [],
        accommodate: 0,
        roomType: [],
        stars: 0
      },
      hotHotels: [],
      filterData: '',
      baseUrl
    };
  },
  actions: {
    async getAllHotels(query?: AllHotelQuery) {
      const hotelData = await getAllHotelsApi(query);
      this.allHotels = hotelData?.data?.data;
      this.hotelTotal = hotelData.total;
    }
  },
  getters: {
    allHotelMap(): AllHotelMap {
      const map: AllHotelMap = {
        id: this.allHotels[0]
      };

      this.allHotels.forEach((item: Hotel) => {
        map![item.id] = item;
      });

      return map;
    }
  }
});
