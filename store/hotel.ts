import { defineStore } from 'pinia';
import { getAllHotelsApi } from '~~/api/index';
import { Hotel, AllHotelMap, AllHoteFilterObj, OptionsType } from '~~/model/hotel';
import { getProductApi } from '@/api/hotel';

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
        people: 0,
        country: '',
        room: 0,
        page: 1,
        limit: 10,
        startDate: new Date(),
        endDate: new Date(+new Date() + 86400000)
      },
      baseServices: ['游泳池', '健身房', '停車場', '機場接送', '酒吧', '溫泉', '禁菸房', '景觀', '提供早餐', '免費網路']
    };
  },
  actions: {
    async getAllHotels(filterObj: AllHoteFilterObj) {
      const hotelData = await getAllHotelsApi(filterObj);
      this.allHotels = hotelData?.data?.data;
      this.hotelTotal = hotelData.total;
      this.curHotelNum = hotelData.result;
    },
    filterHandler(type: string, value: any) {
      switch (type) {
        case 'price':
          this.hotelFilterObj['price[lte]'] = value.max;
          this.hotelFilterObj['price[gte]'] = value.min;
          break;
        case 'rating':
          this.hotelFilterObj['ratingAverage[gte]'] = value;
          break;
        case 'stars':
          this.hotelFilterObj['stars[gte]'] = value;
          break;
        case 'service':
          this.hotelFilterObj['service[in]'] = value;
          break;

        default:
          break;
      }
    },
    async getHotelById(id: string) {
      const hotelData = await getProductApi(id);
      console.log(hotelData, 'asdasd');
      this.hotel = hotelData.data.data;
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
