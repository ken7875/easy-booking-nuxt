export interface Locations {
  type: "Point";
  coordinates: number[];
  address: string;
}

export type Service = (
  | '游泳池'
  | '健身房'
  | '停車場'
  | '機場接送'
  | '酒吧'
  | '溫泉'
  | '禁菸房'
  | '景觀'
  | '提供早餐'
  | '免費網路'
)[];
export interface ViewPorts {
  locations: Locations;
  address: string;
  coordinates: number[];
  name: '';
  product: Hotel | string;
  productCooradinates: number[];
  distance: number;
  id: string;
}

export interface RoomType {
  remainRoom: number;
  name: string;
  image: string[];
  person: number;
  service: Service;
  price: number;
  roomNum: number;
  _id: string;
}

export interface ReserveHotelInfo {
  productId: string;
  bookingNum: number;
  discount: number;
  roomTypeInfo: RoomType;
  date: {
    checkinTime: Date;
    checkoutTime: Date;
  };
  paid: number;
  day: number;
}

export interface Review {
  _id: string;
  createAt: string;
  product: string;
  rating: number;
  review: string;
  user: {
    name: string;
    id: string;
    _id: string;
  };
}

export interface Hotel {
  id: string;
  locations: Locations;
  name: string;
  price: number;
  country: string;
  ratingAverage: number;
  ratingQuantity: number;
  description: string;
  images: string[];
  summary: string;
  freeCancel?: boolean;
  noPrePay?: boolean;
  priceDiscount?: number;
  // viewPorts?: ViewPorts[];
  accommodate: number;
  roomType: RoomType[];
  stars: number;
  // reviews: Review[];
  service: Service;
}

export type AllHotelMap = { [key: string]: Hotel };
export interface BaseRangeQuery {
  price?: number;
  ratingAverage?: number;
  stars?: number;
}

type AllHotelQueryGte = {
  [P in keyof BaseRangeQuery as `${P}[gte]`]?: number;
};

type AllHotelQueryLte = {
  [P in keyof BaseRangeQuery as `${P}[lte]`]?: number;
};

export interface AllHoteFilterObj extends BaseRangeQuery, AllHotelQueryGte, AllHotelQueryLte {
  'service[in]'?: Service;
  page?: number;
  limit?: number;
  country?: string;
  name?: string;
  id?: string;
  people: number;
  starttime: Date;
  endtime: Date;
  room?: number;
}

export type OptionsType = {
  price: { max: number; min: number };
  ratingAverage: number;
  stars: number;
  service: Service;
};
