import { defineStore } from 'pinia';
import { Hotel } from '~~/model/hotel';

interface State {
  mapObj: any;
  markers: any;
  zoom: number;
  coordinates: number[];
}

// const L = () => import('leaflet');
export const useLeaflet = defineStore('leafletStore', {
  state: (): State => {
    return {
      mapObj: {},
      markers: [],
      zoom: 14,
      coordinates: []
    };
  },
  actions: {
    // init() {
    //   // 地圖
    //   this.mapObj = L.map('map', {
    //     center: [51.505, -0.09],
    //     zoom: 14
    //   });
    //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //     maxZoom: 14
    //   }).addTo(this.mapObj);
    // },
  }
});
