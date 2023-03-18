import { useHotel } from '@/store/hotel';
import { useLeaflet } from '@/store/leaflet';
import { useDatePicker } from './datePicker';

export const useStore = () => ({
  useHotel,
  useLeaflet,
  useDatePicker
});
