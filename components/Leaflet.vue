<template>
  <l-map :useGlobalLeaflet="false" v-model:zoom="mapInit.zoom" :center="marker" ref="L" class="h-full w-full">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      layer-type="base"
      name="OpenStreetMap"
    ></l-tile-layer>
    <l-marker :lat-lng="marker" v-for="(marker, i) in markers" :key="i">
      <l-popup> Hi! I'm staying here on this location! </l-popup>
    </l-marker>
    <!-- <l-marker :lat-lng="mapInit.coordinates">
        <l-popup> Hi! I'm staying here on this location! </l-popup>
      </l-marker> -->
  </l-map>
</template>

<script setup lang="ts">
// import { storeToRefs } from 'pinia';
import { useStore } from '~~/store';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { storeToRefs } from 'pinia';

const { useLeaflet } = useStore();

const leafLetStore = useLeaflet();
const { setCenterMarker } = leafLetStore;
const { markers, marker } = storeToRefs(leafLetStore);

const L = ref<any>(null);

interface MapInit {
  zoom: number;
  // coordinates: number[];
}

// interface Props {
//   markers: any[];
// }

// const props = defineProps<Props>();
// const { markers } = toRefs(props);

// map center
const [lat, lng] = [markers.value[0][0], markers.value[0][1]];
setCenterMarker([lat, lng]);
const mapInit = reactive<MapInit>({
  zoom: 14
  // coordinates: [lat, lng]
});

// const markers = computed(() =>
//   allHotels.value.map((hotel: Hotel) => [hotel.locations.coordinates[1], hotel.locations.coordinates[0]])
// );

// const triggerPopup = (latlng: number[]) => {
//   mapInit.coordinates = latlng;
// };

// defineExpose({
//   triggerPopup
// });
</script>
