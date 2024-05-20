import { useHotel } from '~~/store/hotel';
import { useLeaflet } from '~~/store/leaflet';
import { useDatePicker } from './datePicker';
import { useBooking } from './booking';
import { useAuth } from './auth';
import { useMessage } from './msgStore';

export const useStore = () => ({
  useHotel,
  useLeaflet,
  useDatePicker,
  useBooking,
  useAuth,
  useMessage
});
