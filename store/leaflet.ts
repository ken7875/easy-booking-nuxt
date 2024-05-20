import { defineStore } from 'pinia';

interface State {
  markers: number[][];
  marker: number[];
  zoom: number;
}

// const L = () => import('leaflet');
export const useLeaflet = defineStore('leafletStore', {
  state: (): State => {
    return {
      markers: [],
      marker: [],
      zoom: 14
    };
  },
  actions: {
    setMarkers(markers: number[][]) {
      this.markers = markers;
    },
    setCenterMarker(marker: number[]) {
      this.marker = marker;
    }
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
