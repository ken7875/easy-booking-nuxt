import { Decimal } from 'decimal.js';

const toRad = (Value: number) => (Value * Math.PI) / 180;

export default (
  lat1: number | Ref<number>,
  lon1: number | Ref<number>,
  lat2: number | Ref<number>,
  lon2: number | Ref<number>
) => {
  lat1 = unref(lat1);
  lon1 = unref(lon1);
  lat2 = unref(lat2);
  lon2 = unref(lon2);
  console.log(lat1, lon1, lat2, lon2, 'lat lon');

  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const latRad1 = toRad(lat1);
  const latRad2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latRad1) * Math.cos(latRad2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = new Decimal(R * c);

  return +distance.toFixed(2);
};
