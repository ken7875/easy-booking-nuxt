import { useHotel } from '@/store/hotel';
import { useLeaflet } from '@/store/leaflet';

export const useStore = () => ({
  useHotel,
  useLeaflet
});
