<template>
  <div class="w-full flex flex-wrap lg:flex-row h-fit">
    <SearchBar
      :class="['lg:w-full w-[90%] flex lg:z-[40] lg:pl-[20%]', isMapOpen && isMobile ? 'z-[100px]' : 'z-[10]']"
      @updateProducts="getAllHotelsHandler($event, hotelFilterObj)"
    />
    <FilterBarPc :class="['sticky top-[5rem] w-full lg:z-[30]', isMapOpen && isMobile ? 'z-[100px]' : 'z-[10]']" />
    <FilterBarMobile @open-map="toggleMap.openMap.apply(toggleMap)" class="sticky top-[6.5rem] z-[2] h-[3rem]" />
    <article class="lg:w-[50%] w-full lg:px-[20px] relative">
      <div
        class="flex z-[1] h-[70px] justify-center items-center lg:justify-between sticky lg:top-[13rem] top-[9.5rem] left-0 self-start overflow-hidden bg-white"
      >
        <p>找到的飯店總數:{{ hotelTotal }}</p>
        <button
          class="openMap w-[250px] h-[50px] rounded-[8px] opacity-0 bg-[url('/img/checkMap.png')] bg-left-top border-0 text-[1.25rem] font-bold hidden"
          @click="toggleMap.openMap"
          v-if="isDesktop"
        >
          展開地圖
        </button>
      </div>
      <ul>
        <li v-for="(hotel, i) in allHotels" :key="i" :isHorizontal="true" class="mb-[20px]">
          <Card :detailType="detailType" :isHorizontal="true" class="border border-[#dee2e6]">
            <template #header>
              <img
                :src="hotel.images[0]"
                alt=""
                class="min-h-[100%] w-[40vw] lg:w-[10vw] object-cover object-center"
                @click="checkProduct(hotel.id, '所有圖片')"
              />
            </template>
            <template #body>
              <div class="h-full w-full">
                <h2 class="font-bold lg:text-[2rem] text-[1.5rem] ml-[10px]">{{ hotel.name }}</h2>
                <div class="flex items-center ml-[10px] h-[18px] mb-[5px]">
                  <div
                    class="mr-[8px] h-[18px] bg-contain bg-[url('/img/star.png')]"
                    :style="{ width: `${18 * hotel.stars}px` }"
                  ></div>
                  <span v-if="hotel.stars >= 3">{{ hotel.stars }}級飯店</span>
                </div>
                <div
                  :class="[
                    'pl-[10px] py-[8px] border-y border-[#dee2e6] flex items-center',
                    { 'bg-darkLight': detailType.title === '詳細介紹' && detailType.id === hotel.id }
                  ]"
                  @click="checkProduct(hotel.id, '詳細介紹')"
                >
                  <p class="block mr-[5px]">{{ hotel.locations.address }}</p>
                  <font-awesome-icon
                    :icon="[
                      'fa-solid',
                      `angle-${detailType.title === '詳細介紹' && detailType.id === hotel.id ? 'up' : 'down'}`
                    ]"
                  />
                </div>
                <div
                  :class="[
                    'pl-[10px] py-[8px] flex items-center',
                    { 'bg-darkLight': detailType.title === '所有評論' && detailType.id === hotel.id }
                  ]"
                  @click="checkProduct(hotel.id, '所有評論')"
                >
                  <p class="mb-0 w-100 mr-[5px]">
                    <span class="badge bg-success">
                      {{ hotel.ratingAverage }}
                    </span>
                    ({{ hotel.ratingQuantity }} 則評論)
                  </p>
                  <font-awesome-icon
                    :icon="[
                      'fa-solid',
                      `angle-${detailType.title === '所有評論' && detailType.id === hotel.id ? 'up' : 'down'}`
                    ]"
                  />
                </div>
                <!-- 手機footer -->
                <div v-if="!isDesktop" class="border-t border-[#dee2e6] px-[10px]">
                  <div class="flex justify-center items-end">
                    <div class="mr-[5px]">
                      <span class="lg:text-[1.7rem] text-[1.2rem] text-end text-primary inline-block mr-[2px]"
                        >$ {{ hotel.price }}</span
                      >
                      <span class="leading-[1] text-[0.5rem]">每晚</span>
                      <p class="text-[0.8rem] my-[15px]">
                        剩下 <span class="text-primary">{{ calcRoomRemainNums(hotel.id) }}</span> 間空房
                      </p>
                    </div>
                    <NuxtLink :to="`/Hotel-${hotel.id}`" class="button button__outline-primary">查看房間詳情</NuxtLink>
                  </div>
                </div>
              </div>
            </template>
            <template #footer v-if="isDesktop">
              <div class="w-[40%] border-l border-[#dee2e6] p-[10px]">
                <div class="flex items-baseline justify-end">
                  <p class="text-[1.7rem] text-end text-primary mr-[5px]">$ {{ hotel.price }}</p>
                  <p class="leading-[1] text-[0.5rem] text-end">每晚</p>
                </div>
                <p class="text-end text-[0.8rem] my-[15px]">剩下x間空房</p>
                <router-link :to="`/Hotel-${hotel.id}`" class="button button__outline-primary"
                  >查看房間詳情</router-link
                >
              </div>
            </template>
            <template #detail v-if="detailType.id && detailType.title && detailType.id === hotel.id">
              <component :is="renderComp" :id="detailType.id" />
            </template>
          </Card>
        </li>
      </ul>
      <Loading class="absolute bottom-[-2.5%] left-[50%] translate-x-[-50%]" v-if="isHotelApiLoading" />
    </article>
    <article
      class="mapWrap fixed lg:sticky z-[20] lg:top-[13rem] top-[6.5rem] left-[50%] translate-x-[-50%] lg:left-0 lg:translate-x-0 self-start w-[100vw] h-[100vh] lg:w-[50%] lg:h-[72vh] rounded-[8px] overflow-hidden"
    >
      <div class="close absolute top-[2%] right-[2%] z-[1000]" @click="toggleMap.closeMap">X</div>
      <client-only>
        <LazyLeaflet v-if="mapData.markers.length > 0" class="z-[100]" />
      </client-only>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~~/store/index';
import { storeToRefs } from 'pinia';
import Card from '~~/components/card/index.vue';
import Images from '~~/components/productsPage/card/Images.vue';
import Introduce from '~~/components/productsPage/card/Introduce.vue';
import Reviews from '~~/components/productsPage/card/Reviews.vue';
import throttle from '~~/utils/throttle';
import SearchBar from '~~/components/searchBar/index.vue';
import FilterBarPc from '~~/components/filterTool/FilterBarPc.vue';
import FilterBarMobile from '~~/components/filterTool/FilterBarMobile.vue';
import gsap from 'gsap';
import { AllHoteFilterObj, RoomType } from '~~/model/hotel';
import Loading from '~~/components/Loading.vue';
import type { Component } from 'vue';

definePageMeta({
  layout: 'default'
});

useHead({
  title: 'Easy Booking hotel list page',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'You can find all hotel in Easy Booking in this page' }
  ]
});

let htmlDom: HTMLElement | null = null;

const pageData = reactive({
  page: 1,
  limit: 10
});

const { useHotel, useLeaflet } = useStore();

const hotelStore = useHotel();
const { getAllHotels } = hotelStore;
const { allHotels, allHotelMap, hotelFilterObj, hotelTotal, curHotelNum, hotelsCoordinatesData } =
  storeToRefs(hotelStore);

const leafletStore = useLeaflet();
const { setMarkers, setCenterMarker } = leafletStore;

// 篩選條件改變需要初始的資料
const resetFilterData = () => {
  // 篩選資料需要reset
  hotelStore.$patch({
    allHotels: []
  });

  pageData.page = 1;
  pageData.limit = 10;

  hotelStore.$patch({
    hotelFilterObj: {
      page: pageData.page,
      limit: pageData.limit
    }
  });

  if (process.client) {
    // 避免資料過短網頁觸底重新搜尋觸發handleScroll造成發2次api
    window.scrollTo(0, 0);
  }
};

const curHotelTotal = ref(0);
const isHotelApiLoading = ref(false);

// 取得所有飯店api
const getAllHotelsHandler = async (resetData: boolean, filterObj: AllHoteFilterObj) => {
  if (resetData) {
    // 更新篩選條件時需要讓page回到第一頁
    resetFilterData();
  }

  isHotelApiLoading.value = true;

  console.log(filterObj, 'filterObj');
  await getAllHotels(filterObj);

  isHotelApiLoading.value = false;

  checkProduct(allHotels.value[0]?.id);

  curHotelTotal.value += curHotelNum.value;
};

watch(
  () => [
    hotelFilterObj.value['price[lte]'],
    hotelFilterObj.value['price[gte]'],
    hotelFilterObj.value['ratingAverage[gte]'],
    hotelFilterObj.value['stars[gte]'],
    hotelFilterObj.value['service[in]']
  ],
  () => {
    getAllHotelsHandler(true, hotelFilterObj.value);
  },
  {
    deep: true
  }
);

// 計算房間剩餘數量
const calcRoomRemainNums = (id: string) => {
  return allHotelMap.value[id].roomType.reduce((acc, cur) => {
    return (acc += cur.remainRoom);
  }, 0);
};

const removeScrollListener = () => {
  window.removeEventListener('scroll', throttleScroll);
  htmlDom = null;
};

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = htmlDom!;

  if (allHotels.value?.length > 0 && curHotelTotal.value >= hotelTotal.value) {
    return;
  }

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    hotelStore.$patch({
      hotelFilterObj: {
        page: ++pageData.page,
        limit: pageData.limit
      }
    });

    getAllHotelsHandler(false, hotelFilterObj.value);
  }
};

const throttleScroll = throttle(handleScroll.bind(this, htmlDom), 500);

onMounted(() => {
  getAllHotelsHandler(false, hotelFilterObj.value);

  if (process.client) {
    htmlDom = document.querySelector('html')!;
    window.addEventListener('scroll', throttleScroll);
  }
});

onBeforeUnmount(() => {
  removeScrollListener();
  hotelStore.$reset();
});

type CurComp = {
  所有圖片: Component | null;
  所有評論: Component | null;
  詳細介紹: Component | null;
};

const curComp: CurComp = {
  所有圖片: Images,
  所有評論: Reviews,
  詳細介紹: Introduce
};

interface detailType {
  id: string;
  title: '所有圖片' | '所有評論' | '詳細介紹' | '';
}

const renderComp = shallowRef<Component | null>(null);

const detailType = ref<detailType>({
  id: '',
  title: ''
});

// 地圖需要資料
interface MapData {
  markers: number[][];
}

const mapData = reactive<MapData>({
  markers: []
});

const checkProduct = (id: string, title?: keyof CurComp): void => {
  if (detailType.value.title === title && detailType.value.id === id) {
    renderComp.value = null;
    detailType.value.id = '';
    detailType.value.title = '';
    return;
  }
  if (title) {
    renderComp.value = curComp[title];
  }

  detailType.value = { id, title: title || '' };

  const [lat, lng] = [
    allHotelMap.value[id]?.locations?.coordinates[1],
    allHotelMap.value[id]?.locations?.coordinates[0]
  ];

  mapData.markers = hotelsCoordinatesData.value;
  setMarkers(mapData.markers);
  setCenterMarker([lat, lng]);

  console.log(lat, lng, 'asdasd');
};

// 地圖開關動畫
const { isMobile, isDesktop } = useDevice();

interface ToggleMap {
  tl: GSAPTimeline | null;
  closeMap: () => void;
  openMap: () => void;
  killAnimation: () => void;
}

const isMapOpen = ref(false);

const toggleMap: ToggleMap = {
  tl: gsap.timeline(),
  closeMap() {
    this.tl?.to('.close', { display: 'none', duration: 0 });
    this.tl?.to('.mapWrap', { height: '50px', duration: 1 });
    this.tl?.to('.mapWrap', { width: '0px', duration: 1 }, '<+=100%');
    if (isDesktop) {
      this.tl?.to('.openMap', { opacity: 1, display: 'block', duration: 1 }, '>');
      this.tl?.fromTo('.openMap', { x: 100 }, { x: 0, duration: 1 }, '<');
    }
    isMapOpen.value = false;
  },
  openMap() {
    if (isDesktop) {
      this.tl?.to('.openMap', { opacity: 0, display: 'none', duration: 1 });
      this.tl?.fromTo('.openMap', { x: 0 }, { x: 100, duration: 1 });
    }
    this.tl?.to('.mapWrap', { width: isDesktop ? '50%' : '100%', duration: 1, zIndex: 100 });
    this.tl?.to('.mapWrap', { height: isDesktop ? '550px' : '100vh', duration: 1 }, '<+=100%');
    this.tl?.to('.close', { display: 'block', duration: 0 }, '<+=100%');
    isMapOpen.value = true;
  },
  killAnimation() {
    this.tl?.kill();
    this.tl = null;
  }
};

onBeforeUnmount(() => {
  toggleMap.killAnimation();
});
</script>
