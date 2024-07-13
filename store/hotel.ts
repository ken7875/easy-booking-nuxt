import { defineStore } from 'pinia';
import { apiMethods } from '~~/api/index';
import { type Hotel, type AllHotelMap, type AllHoteFilterObj } from '~~/model/hotel';
// import type { PublicRuntimeConfig } from 'nuxt/schema';

interface State {
  allHotels: Hotel[];
  hotelTotal: number;
  hotel: Hotel;
  hotHotels: Hotel[];
  baseUrl: string;
  hotelFilterObj: AllHoteFilterObj;
  curHotelNum: number;
  baseServices: string[];
}

export const useHotel = defineStore('hotelStore', {
  state: (): State => {
    const runtimeConfig = useRuntimeConfig();
    const { baseUrl } = runtimeConfig.public;
    return {
      allHotels: [],
      hotelTotal: 0, // 資料總筆數
      curHotelNum: 0, // 當前分頁筆數
      hotel: {
        id: '',
        locations: {
          type: 'Point',
          coordinates: [],
          address: ''
        },
        name: '',
        price: 0,
        country: '台灣',
        ratingAverage: 0,
        ratingQuantity: 0,
        description: '',
        images: [],
        summary: '',
        viewPorts: [],
        accommodate: 0,
        roomType: [],
        stars: 0,
        service: [],
        reviews: []
      },
      hotHotels: [],
      baseUrl: baseUrl as unknown as string,
      hotelFilterObj: {
        minPrice: 0,
        maxPrice: 20000,
        ratingAverage: 0,
        stars: 0,
        service: ['游泳池', '健身房', '停車場', '機場接送', '酒吧', '溫泉', '禁菸房', '景觀', '提供早餐', '免費網路'],
        people: 0,
        country: '',
        room: 0,
        page: 1,
        limit: 10,
        starttime: new Date(),
        endtime: new Date(+new Date() + 86400000)
      },
      baseServices: ['游泳池', '健身房', '停車場', '機場接送', '酒吧', '溫泉', '禁菸房', '景觀', '提供早餐', '免費網路']
    };
  },
  actions: {
    async getAllHotels(filterObj?: AllHoteFilterObj) {
      const hotelData = await apiMethods.hotel.getAllHotels(filterObj);
      this.allHotels = hotelData?.data?.data;

      this.hotelTotal = hotelData.total;
      this.curHotelNum = hotelData.result;
    },
    filterHandler(type: string, value: any) {
      switch (type) {
        case 'price':
          this.hotelFilterObj['maxPrice'] = value.max;
          this.hotelFilterObj['minPrice'] = value.min;
          break;
        case 'rating':
          this.hotelFilterObj['ratingAverage'] = value;
          break;
        case 'stars':
          this.hotelFilterObj['stars'] = value;
          break;
        case 'service':
          this.hotelFilterObj['service'] = value;
          break;

        default:
          break;
      }
    },
    resetHotelData() {
      this.allHotels = [];
    },
    patchFilterDate(data: { [P in keyof AllHoteFilterObj]?: AllHoteFilterObj[P] }) {
      this.$patch({
        hotelFilterObj: { ...data }
      });
    }
  },
  getters: {
    allHotelMap(): AllHotelMap {
      const map: AllHotelMap = {};
      this.allHotels.forEach((item: Hotel) => {
        map![item.id] = {
          ...item
        };
      });

      return map;
    },
    hotelsCoordinatesData(): number[][] {
      return this.allHotels.map((hotel: Hotel) => {
        const [lat, lng] = [hotel.locations.coordinates[1], hotel.locations.coordinates[0]];
        return [lat, lng];
      });
    }
  }
});
