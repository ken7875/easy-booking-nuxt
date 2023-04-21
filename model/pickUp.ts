export interface PickUpKey {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PickUpApiParams {
  airport: PickUpKey;
  hotel: PickUpKey;
}

export interface PickUpOrder {
  hotel: {
    coordinates: number[];
    name: string;
  };
  _id: string;
  userId: string;
  airport: {
    name: string;
    coordinates: number[];
    _id: string;
  };
  distance: number;
  price: number;
}
