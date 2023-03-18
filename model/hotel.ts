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
interface BaseAllHotelQuery {
  name?: string;
  id?: string;
  price?: number;
  page?: number;
  limit?: number;
  country?: string;
}

type AllHotelQueryGte = {
  [P in keyof BaseAllHotelQuery as `${P}[gte]`]?: string | number;
};

type AllHotelQueryLte = {
  [P in keyof BaseAllHotelQuery as `${P}[gte]`]?: string | number;
};

export interface AllHotelQuery extends BaseAllHotelQuery, AllHotelQueryGte, AllHotelQueryLte {}
