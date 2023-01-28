import { defineStore } from 'pinia';
import { getAllHotelsApi } from '@/api/index';
import { Hotel } from '@/model/hotel';
interface State {
  allHotels: Hotel[];
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
        roomType: []
      },
      hotHotels: [],
      filterData: '',
      baseUrl
    };
  },
  actions: {
    async getAllHotels(query?: string) {
      const hotelData = await getAllHotelsApi();
      console.log(hotelData, 'asjdklasjdklasjd');
      this.allHotels = hotelData?.data?.data;
      console.log(this.allHotels);
    }
  }
});
