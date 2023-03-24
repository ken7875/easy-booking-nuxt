<template>
  <l-map
    :useGlobalLeaflet="false"
    v-model:zoom="mapInit.zoom"
    :center="mapInit.coordinates"
    ref="L"
    class="h-full w-full"
  >
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
import { storeToRefs } from 'pinia';
import { useStore } from '~~/store';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { Hotel } from '~~/model/hotel';

const { useHotel } = useStore();

const hotelStore = useHotel();
const { allHotels, allHotelMap } = storeToRefs(hotelStore);

const L = ref<any>(null);

interface MapInit {
  markers: any;
  zoom: number;
  coordinates: number[];
}

interface Props {
  id: string;
}

const props = defineProps<Props>();
const mapInit = reactive<MapInit>({
  markers: [],
  zoom: 14,
  coordinates: [
    allHotelMap.value[props.id]?.locations?.coordinates[1],
    allHotelMap.value[props.id]?.locations?.coordinates[0]
  ]
});

const markers = computed(() =>
  allHotels.value.map((hotel: Hotel) => [hotel.locations.coordinates[1], hotel.locations.coordinates[0]])
);

const triggerPopup = (latlng: number[]) => {
  mapInit.coordinates = latlng;
};

defineExpose({
  triggerPopup
});
</script>
