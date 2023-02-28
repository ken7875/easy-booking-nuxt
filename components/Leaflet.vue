<template>
  <div>
    <l-map
      :useGlobalLeaflet="false"
      v-model:zoom="mapInit.zoom"
      :center="[mapInit.coordinates[1], mapInit.coordinates[0]]"
      ref="L"
      style="height: 600px; width: 800px"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="[mapInit.coordinates[1], mapInit.coordinates[0]]">
        <l-popup> Hi! I'm staying here on this location! </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from '~~/store';
import { Hotel } from '@/model/hotel';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

const { useHotel } = useStore();

const hotelStore = useHotel();
const { allHotels, allHotelMap } = storeToRefs(hotelStore);

const L = ref<any>(null);

interface MapInit {
  markers: any;
  zoom: number;
  coordinates: number[];
}

const mapInit = reactive<MapInit>({
  markers: [],
  zoom: 14,
  coordinates: [-47, 25]
});

const triggerPopup = (id: string) => {
  // 找出地圖對應座標
  if (allHotelMap.value) {
    mapInit.coordinates[0] = allHotelMap.value[id].locations.coordinates[0];
    mapInit.coordinates[1] = allHotelMap.value[id].locations.coordinates[1];
    console.log(allHotelMap, allHotelMap.value[id].locations.coordinates[0], 'asd123');
  }
  //   const matchMarkers = mapInit.markers.find((item: Hotel) => item.id === id);
  //   L.panTo([matchMarkers.lat, matchMarkers.lng]);
  //   matchMarkers.openPopup();
};

watch(allHotels, () => {
  nextTick(() => {
    triggerPopup(allHotels.value[0].id);
  });
});

// onMounted(() => {
//   triggerPopup(allHotels.value[0].id);
// });
</script>
