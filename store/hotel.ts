import { defineStore } from 'pinia';

interface Locations {
  coordinates: number[];
  address: string;
}

interface ViewPorts {
  locations: Locations;
  address: string;
  coordinates: number[];
  name: '';
  product: Hotel | string;
  productCooradinates: number[];
  distance: number;
  id: string;
}

export interface roomType {
  remainRoom: number;
  name: string;
  image: string[];
  person: number;
  service: string[];
  price: number;
  roomNum: number;
}

export interface Hotel {
  id: '';
  locations: Locations;
  name: string;
  price: number;
  country: string;
  ratingAverage: number;
  ratingQuantity: string;
  description: string;
  images: string[];
  summary: string;
  viewPorts: ViewPorts[];
  accommodate: number;
  roomType: roomType[];
}

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
        country: '',
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
      const path = query ? `products?${query}` : 'products';
      const apiUrl = `${this.baseUrl}/${path}`;
      const data = (await $fetch(apiUrl)) as any;
      // console.log(data, 'asd');
      // console.log(data.value?.data.data);
      console.log(data.data.data);
      this.allHotels = data.data.data;
    },
    getHotHotels() {
      // const apiUrl = `${this.baseUrl}/products/hotProducts`;
      // const { data } = useAsyncData('hello world', () => $fetch(apiUrl));
    }
  }
});
