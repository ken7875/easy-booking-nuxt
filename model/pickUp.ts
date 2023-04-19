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
