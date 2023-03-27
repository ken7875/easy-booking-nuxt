export interface Locations {
  coordinates: number[];
  address: string;
}

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
  id: string;
  locations: Locations;
  name: string;
  price: number;
  country: '台灣' | '美國' | '日本' | '加拿大' | '韓國' | '中國';
  ratingAverage: number;
  ratingQuantity: string;
  description: string;
  images: string[];
  summary: string;
  viewPorts: ViewPorts[];
  accommodate: number;
  roomType: roomType[];
  stars: number;
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
  'service[in]'?: string[];
  page?: number;
  limit?: number;
  country?: string;
  name?: string;
  id?: string;
  people: number;
  startDate: Date;
  endDate: Date;
  room?: number;
}

export type OptionsType = {
  price: { max: number; min: number };
  ratingAverage: number;
  stars: number;
  service: string[];
};
