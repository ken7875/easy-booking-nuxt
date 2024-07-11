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
// import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons/faCircleChevronLeft';
// import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons/faCircleChevronRight';
// import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
// import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
// import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
// import { faWifi } from '@fortawesome/free-solid-svg-icons/faWifi';
// import { faUtensils } from '@fortawesome/free-solid-svg-icons/faUtensils';
// import { faMountain } from '@fortawesome/free-solid-svg-icons/faMountain';
// import { faSmoking } from '@fortawesome/free-solid-svg-icons/faSmoking';
// import { faHotTub } from '@fortawesome/free-solid-svg-icons/faHotTub';
// import { faMartiniGlass } from '@fortawesome/free-solid-svg-icons/faMartiniGlass';
// import { faDumbbell } from '@fortawesome/free-solid-svg-icons/faDumbbell';
// import { faCarSide } from '@fortawesome/free-solid-svg-icons/faCarSide';
// import { faSquareParking } from '@fortawesome/free-solid-svg-icons/faSquareParking';
// import { faPersonSwimming } from '@fortawesome/free-solid-svg-icons/faPersonSwimming';
// import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
// import { faUserLarge } from '@fortawesome/free-solid-svg-icons/faUserLarge';
// import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
// import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
// import { faAnglesDown } from '@fortawesome/free-solid-svg-icons/faAnglesDown';
// import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons/faPlaneDeparture';

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
  faMountain,
  faSmoking,
  faHotTub,
  faMartiniGlass,
  faDumbbell,
  faPersonSwimming,
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
