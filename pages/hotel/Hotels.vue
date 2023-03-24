<template>
  <div class="w-full flex flex-wrap flex-col-reverse lg:flex-row h-fit">
    <SearchBar class="w-full flex h-[5rem] z-[40]" />
    <FilterBar class="sticky top-[5rem] w-full z-[30]" @updageProducts="getAllHotelsHandler($event, hotelFilterObj)" />
    <article class="lg:w-[50%] w-full lg:px-[20px] relative">
      <!--  top-[19.6rem] 為 navbar height(6.5rem) + SearchBar height(5rem) -->
      <div
        class="flex z-[10] h-[70px] justify-center lg:justify-between sticky lg:top-[13rem] top-[6.5rem] left-0 self-start overflow-hidden bg-white py-[15px]"
      >
        <p>找到的飯店總數:{{ hotelTotal }}</p>
        <button
          class="openMap w-[250px] h-[50px] rounded-[8px] opacity-0 bg-[url('/img/checkMap.png')] bg-left-top border-0 text-[1.25rem] font-bold hidden"
          @click="toggleMap.openMap"
        >
          展開地圖
        </button>
      </div>
      <ul>
        <li v-for="(hotel, i) in loadedHotels" :key="i" :isHorizontal="true" class="mb-[20px]">
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
                  class="pl-[10px] py-[8px] border-y border-[#dee2e6] flex items-center"
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
                <div class="pl-[10px] py-[8px] flex items-center" @click="checkProduct(hotel.id, '所有評論')">
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
                  <!-- <div class="flex items-baseline justify-end flex-nowrap">
                      <p class="text-[1.7rem] text-end text-primary mr-[5px]">$ {{ hotel.price }}</p>
                      <p class="leading-[1] text-[0.5rem] text-end">每晚</p>
                    </div>
                    <p class="text-end text-[0.8rem] my-[15px]">剩下x間空房</p>
                    <router-link :to="`/hotel/Hotel-${hotel.id}`" class="button button__outline-primary"
                      >查看房間詳情</router-link
                    > -->
                  <div class="flex justify-center items-end">
                    <div class="mr-[5px]">
                      <span class="lg:text-[1.7rem] text-[1.2rem] text-end text-primary inline-block mr-[2px]"
                        >$ {{ hotel.price }}</span
                      >
                      <span class="leading-[1] text-[0.5rem]">每晚</span>
                      <p class="text-[0.8rem] my-[15px]">剩下x間空房</p>
                    </div>
                    <router-link :to="`/hotel/Hotel-${hotel.id}`" class="button button__outline-primary"
                      >查看房間詳情</router-link
                    >
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
                <router-link :to="`/hotel/Hotel-${hotel.id}`" class="button button__outline-primary"
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
      <!-- v-if="isHotelApiLoading" -->
      <Loading class="absolute bottom-[-2.5%] left-[50%] translate-x-[-50%]" v-if="isHotelApiLoading" />
    </article>
    <article
      class="mapWrap fixed lg:sticky z-[20] lg:top-[13rem] top-[6.5rem] left-[50%] translate-x-[-50%] lg:left-0 lg:translate-x-0 self-start w-[100vw] h-[100vh] lg:w-[50%] lg:h-[72vh] rounded-[8px] overflow-hidden"
    >
      <div class="close absolute top-[2%] right-[2%] z-[1000]" @click="toggleMap.closeMap">X</div>
      <LazyLeaflet
        v-if="loadedHotels.length > 0"
        :id="detailType.id || loadedHotels[0]?.id"
        ref="leaflet"
        class="z-[10]"
      />
    </article>
  </div>
</template>

<script setup lang="ts">
import { useHotel } from '~~/store/hotel';
import { storeToRefs } from 'pinia';
import Card from '~~/components/card/index.vue';
import Images from '~~/components/productsPage/card/Images.vue';
import Introduce from '~~/components/productsPage/card/Introduce.vue';
import Reviews from '~~/components/productsPage/card/Reviews.vue';
import throttle from '~~/utils/throttle';
import SearchBar from '~~/components/searchBar/index.vue';
import FilterBar from '~~/components/filterBar/index.vue';
// import Leaflet from '~~/components/Leaflet.vue';
import { Hotel } from '~~/model/hotel';
import gsap from 'gsap';
import { AllHoteFilterObj } from '~~/model/hotel';
import Loading from '@/components/Loading.vue';

definePageMeta({
  layout: 'default'
});

let htmlDom: HTMLElement | null = null;

const pageData = reactive({
  page: 1,
  limit: 10
});

const loadedHotels = ref<Hotel[]>([]);
const hotelStore = useHotel();
const { getAllHotels } = hotelStore;
const { allHotels, allHotelMap, hotelFilterObj, hotelTotal, curHotelNum } = storeToRefs(hotelStore);

// 篩選條件改變需要初始的資料
const resetFilterData = () => {
  // 篩選資料需要reset
  loadedHotels.value = [];
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
    resetFilterData();
  }

  isHotelApiLoading.value = true;

  await getAllHotels(filterObj);

  isHotelApiLoading.value = false;

  checkProduct(allHotels.value[0].id);

  curHotelTotal.value += curHotelNum.value;

  loadedHotels.value?.push(...allHotels.value);
};

const removeScrollListener = () => {
  window.removeEventListener('scroll', throttleScroll);
  htmlDom = null;
};

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = htmlDom!;

  if (loadedHotels.value?.length > 0 && curHotelTotal.value >= hotelTotal.value) {
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
});

type CurComp = {
  所有圖片: ReturnType<typeof defineComponent>;
  所有評論: ReturnType<typeof defineComponent>;
  詳細介紹: ReturnType<typeof defineComponent>;
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

const renderComp = shallowRef(null);

const detailType = ref<detailType>({
  id: '',
  title: ''
});

const leaflet = ref();

const checkProduct = (id: string, title?: keyof CurComp): void => {
  if (title) {
    renderComp.value = curComp[title];
  }
  detailType.value = { id, title: title || '' };
  const [lat, lng] = [allHotelMap.value[id].locations.coordinates[1], allHotelMap.value[id].locations.coordinates[0]];

  leaflet.value?.triggerPopup([lat, lng]);
};

// 地圖開關動畫
const { isMobile, isTablet, isDesktop } = useDevice();

interface ToggleMap {
  tl: GSAPTimeline | null;
  closeMap: () => void;
  openMap: () => void;
  killAnimation: () => void;
}

const toggleMap: ToggleMap = {
  tl: gsap.timeline(),
  closeMap() {
    this.tl?.to('.close', { display: 'none', duration: 0 });
    this.tl?.to('.mapWrap', { height: '50px', duration: 1 });
    this.tl?.to('.mapWrap', { width: '0px', duration: 1 }, '<+=100%');
    this.tl?.to('.openMap', { opacity: 1, display: 'block', duration: 1 }, '>');
    if (isDesktop) {
      this.tl?.fromTo('.openMap', { x: 100 }, { x: 0, duration: 1 }, '<');
    }
  },
  openMap() {
    this.tl?.to('.openMap', { opacity: 0, display: 'none', duration: 1 });
    this.tl?.fromTo('.openMap', { x: 0 }, { x: 100, duration: 1 });
    this.tl?.to('.mapWrap', { width: isDesktop ? '50%' : '100%', duration: 1 });
    this.tl?.to('.mapWrap', { height: isDesktop ? '550px' : '100vh', duration: 1 }, '<+=100%');
    this.tl?.to('.close', { display: 'block', duration: 0 }, '<+=100%');
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
