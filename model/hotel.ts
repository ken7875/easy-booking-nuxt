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
  id: '';
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
}
