<template>
  <ServiceLayout>
    <template #title>
      <h2>機場接送</h2>
    </template>
    <template #left>
      <div class="px-[15px]">
        <h3 class="my-[25px] text-[1.2rem]">選擇地點</h3>
        <form @submit="submit">
          <BaseSelect
            v-model="airport"
            :options="airportOptionsAry"
            label="請選擇機場"
            class="lg:mb-[25px] mb-[15px] w-full"
            @change="setMarker('airport')"
          />
          <BaseSelect
            v-model="hotel"
            :options="hotelOptionsAry"
            label="請選擇飯店"
            class="lg:mb-[25px] mb-[15px] w-full"
            defaultOption="請選擇飯店"
            @change="setMarker('hotel')"
          />
          <p>
            距離: <span>{{ distance }}</span> (km)
          </p>
          <p>計價: {{ price }} (台幣)</p>
          <div class="flex justify-end">
            <Button type="submit">送出</Button>
          </div>
        </form>
      </div>
    </template>
    <template #right>
      <client-only>
        <LazyLeaflet ref="leaflet" v-if="mapData.markers.length > 0" />
      </client-only>
    </template>
  </ServiceLayout>
</template>

<script setup lang="ts">
import ServiceLayout from './ServiceModalLayout.vue';
import BaseSelect from '~~/components/form/BaseSelect.vue';
import { useField, useForm } from 'vee-validate';
import { string } from 'yup';
import { createPickUpOrderApi } from '~~/api/pickUp';
import { useStore } from '~~/store/index';
import airportJson from '~~/assets/json/airport.json';
import { Hotel } from '~~/model/hotel';
import { storeToRefs } from 'pinia';
import calcDistance from '~~/utils/calcDistance';
import { Decimal } from 'decimal.js';
import { object } from 'yup';

const { useMessage, useHotel, useLeaflet } = useStore();

const hotelStore = useHotel();
const { allHotels } = storeToRefs(hotelStore);

const leafletStore = useLeaflet();
const { setMarkers, setCenterMarker } = leafletStore;

const validationSchema = object({
  airport: string().required(),
  hotel: string().required()
});

const formValidate = useForm({
  validationSchema
});

type AirportJson = typeof airportJson;

const { value: airport } = useField<keyof AirportJson>('airport', undefined, {
  initialValue: '台灣松山機場'
});
const { value: hotel } = useField('hotel', undefined, {
  initialValue: allHotels.value[0].name
});

const { handleSubmit, errors } = formValidate;

const msgStore = useMessage();
const { openMsg } = msgStore;

// 處理地圖
const leaflet = ref();
interface MapData {
  markers: number[][];
}

const mapData = reactive<MapData>({
  markers: [
    [airportJson[airport.value].coordinates.lat, airportJson[airport.value].coordinates.lng],
    [allHotels.value[0].locations.coordinates[1], allHotels.value[0].locations.coordinates[0]]
  ]
});

setMarkers(mapData.markers); // 設定pinia markers值

const hotelsMap = computed(() => {
  let map: { [key: string]: Hotel } = {};

  allHotels.value.forEach((hotel: Hotel) => {
    map[hotel.name] = hotel;
  });

  return map;
});

let airportCoordinates = ref<number[]>(mapData.markers[0]);
let hotelCoordinates = ref<number[]>(mapData.markers[1]);

const setMarker = (type: string) => {
  mapData.markers = [];

  if (type === 'airport') {
    airportCoordinates.value = [];
    const { lat, lng } = airportJson[airport.value].coordinates;
    airportCoordinates.value.push(lat, lng);
    setCenterMarker(airportCoordinates.value);
  } else {
    hotelCoordinates.value = [];
    const [lng, lat] = hotelsMap.value[hotel.value].locations.coordinates;
    hotelCoordinates.value.push(lat, lng);
    setCenterMarker(hotelCoordinates.value);
  }
  mapData.markers.push(airportCoordinates.value, hotelCoordinates.value);
  setMarkers(mapData.markers);
};

const distance = computed(() => {
  const [airportLat, airportLng] = airportCoordinates.value;
  const [hotelLat, hotelLng] = hotelCoordinates.value;
  return calcDistance(airportLat, airportLng, hotelLat, hotelLng);
});
const price = computed(() => {
  const price = new Decimal(85 + ((distance.value * 1000) / 200) * 5);
  return price.toFixed(0);
});
// 處理地圖

const submit = handleSubmit(() => {
  console.log(airport, hotel);
  if (!airport.value || !hotel.value) {
    openMsg({
      title: '錯誤',
      content: '請選擇要乘車的機場與飯店'
    });
    return;
  }

  createPickUpOrderApi({
    airport: airportJson[airport.value],
    hotel: {
      name: hotel.value,
      coordinates: {
        lat: hotelsToMap.value[hotel.value]?.locations?.coordinates[1],
        lng: hotelsToMap.value[hotel.value]?.locations?.coordinates[0]
      }
    }
  });
});

const hotelOptionsAry = ref<{ content: string }[]>([]);

// 飯店 option
allHotels.value.forEach((hotel: Hotel) => {
  hotelOptionsAry.value.push({ content: hotel.name });
});

// 飯店陣列變成物件格式
const hotelsToMap = computed(() => {
  const map: { [key: string]: Hotel } = {};
  allHotels.value.forEach((hotel: Hotel) => {
    map[hotel.name] = hotel;
  });

  return map;
});

// 機場 option
const airportOptionsAry = ref<{ content: string }[]>([]);

for (let i = 0; i < Object.keys(airportJson).length; i++) {
  airportOptionsAry.value.push({ content: Object.keys(airportJson)[i] });
}
</script>
