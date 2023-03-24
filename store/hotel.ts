import { defineStore } from 'pinia';
import { getAllHotelsApi } from '~~/api/index';
import { Hotel, AllHotelMap } from '~~/model/hotel';
import { AllHoteFilterObj } from '~~/model/hotel';

interface State {
  allHotels: Hotel[];
  hotelTotal: number;
  hotel: Hotel;
  hotHotels: Hotel[];
  baseUrl: string;
  hotelFilterObj: AllHoteFilterObj;
  curHotelNum: number;
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
      baseUrl,
      hotelFilterObj: {
        'price[gte]': 0,
        'price[lte]': 20000,
        'ratingAverage[gte]': 0,
        'stars[gte]': 0,
        'service[in]': [
          '游泳池',
          '健身房',
          '停車場',
          '機場接送',
          '酒吧',
          '溫泉',
          '禁菸房',
          '景觀',
          '提供早餐',
          '免費網路'
        ],
        page: 1,
        limit: 10
      }
    };
  },
  actions: {
    async getAllHotels(filterObj: AllHoteFilterObj = {}) {
      const hotelData = await getAllHotelsApi(filterObj);
      console.log(hotelData);
      this.allHotels = hotelData?.data?.data;
      this.hotelTotal = hotelData.total;
      this.curHotelNum = hotelData.result;
    }
  },
  getters: {
    allHotelMap(): AllHotelMap {
      const map: AllHotelMap = {
        id: {
          ...this.allHotels[0]
        }
      };
      this.allHotels.forEach((item: Hotel) => {
        map![item.id] = {
          ...item
        };
      });

      return map;
    }
  }
});
