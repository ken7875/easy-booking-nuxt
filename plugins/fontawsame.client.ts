import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faAngleUp,
  faWifi,
  faUtensils,
  faMountain,
  faSmoking,
  faHotTub,
  faMartiniGlass,
  faDumbbell,
  faCarSide,
  faSquareParking,
  faPersonSwimming,
  faCircleXmark,
  faUserLarge,
  faLocationDot,
  faXmark,
  faAnglesDown
} from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

library.add(
  faCircleChevronLeft,
  faCircleChevronRight,
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faAngleUp,
  faWifi,
  faUtensils,
  faPersonSwimming,
  faMountain,
  faSmoking,
  faHotTub,
  faMartiniGlass,
  faDumbbell,
  faCarSide,
  faSquareParking,
  faCircleXmark,
  faUserLarge,
  faLocationDot,
  faXmark,
  faAnglesDown
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
