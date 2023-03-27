import { useHotel } from '~~/store/hotel';
import { useLeaflet } from '~~/store/leaflet';
import { useDatePicker } from './datePicker';
import { useModal } from './modal';

export const useStore = () => ({
  useHotel,
  useLeaflet,
  useDatePicker,
  useModal
});
